import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { badRequestError, forbiddenError } from "@/src/app/_server/http-error";
import { sessionHandler } from "@/src/app/_server/session-handler";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";
import prisma from "@/src/app/_shared/lib/prisma";

export async function POST(req: NextRequest) {
  return sessionHandler(req, "投稿一括選択", async () => {
    const body = await req.json();
    const {
      reflectionCUID: selectedReflectionList,
      folderUUID,
      username
    } = body;
    const userId = await getUserIdByUsername(username);

    if (!Array.isArray(selectedReflectionList) || !folderUUID || !userId) {
      return badRequestError(
        "投稿一括選択のリクエストパラメータに不整合があります"
      );
    }

    // MEMO: ユーザーが選択した投稿が全て自分のものか確認するために見つけに行く
    const selected = await prisma.reflection.findMany({
      where: {
        reflectionCUID: {
          in: selectedReflectionList
        },
        userId
      }
    });

    if (selected.length !== selectedReflectionList.length) {
      return forbiddenError("選択した投稿の中に自分の投稿以外が含まれています");
    }

    await prisma.$transaction([
      prisma.reflection.updateMany({
        where: {
          userId,
          folderUUID,
          // MEMO: 現在あるフォルダに所属している投稿のうち、
          //       今回選択されなかった投稿（selectedReflectionListに含まれていないもの）
          //       のフォルダ設定を解除する（folderUUIDをnullにする）。
          reflectionCUID: { notIn: selectedReflectionList }
        },
        data: { folderUUID: null }
      }),
      prisma.reflection.updateMany({
        where: {
          userId,
          // MEMO: 今回選択された投稿（selectedReflectionListに含まれるもの）
          //       に対して、指定されたフォルダに設定する（folderUUIDを更新する）。
          reflectionCUID: { in: selectedReflectionList }
        },
        data: { folderUUID }
      })
    ]);

    return NextResponse.json(
      { message: "選択した投稿をフォルダに更新しました" },
      { status: 200 }
    );
  });
}
