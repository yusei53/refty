import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import prisma from "@/src/lib/prisma";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import {
  badRequestError,
  forbiddenError,
  internalServerError,
  unauthorizedError
} from "@/src/utils/http-error";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reflectionCUID, folderUUID, username } = body;
    const userId = await getUserIdByUsername(username);

    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return unauthorizedError("認証されていません");
    }

    if (!Array.isArray(reflectionCUID) || !folderUUID || !userId) {
      return badRequestError(
        "投稿一括選択のリクエストパラメータに不整合があります"
      );
    }

    // MEMO: ユーザーが選択した投稿が全て自分のものか確認するために見つけに行く
    const selected = await prisma.reflection.findMany({
      where: {
        reflectionCUID: {
          in: reflectionCUID
        },
        userId
      }
    });

    if (selected.length !== reflectionCUID.length) {
      return forbiddenError("選択した投稿の中に自分の投稿以外が含まれています");
    }

    await prisma.$transaction([
      prisma.reflection.updateMany({
        where: {
          userId,
          folderUUID,
          // MEMO: 現在フォルダに入っているが、今回選択されていない投稿をフォルダから外す
          reflectionCUID: { notIn: reflectionCUID }
        },
        data: { folderUUID: null }
      }),
      prisma.reflection.updateMany({
        where: {
          userId,
          // MEMO: 選択された投稿をフォルダに入れる
          reflectionCUID: { in: reflectionCUID }
        },
        data: { folderUUID }
      })
    ]);

    return NextResponse.json(
      { message: "選択した投稿をフォルダに更新しました" },
      { status: 200 }
    );
  } catch (error) {
    internalServerError("POST", "投稿一括選択", error);
  }
}
