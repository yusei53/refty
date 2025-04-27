import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserIdByUsername } from "@/src/app/_client/utils/actions/get-userId-by-username";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_client/utils/http-error";
import prisma from "@/src/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const userId = await getUserIdByUsername(username);
  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }

  try {
    const folderUUID = req.nextUrl.searchParams.get("folder") ?? undefined;

    // folderUUIDが指定されていれば、そのフォルダに属する反映のみ取得、なければ全反映を取得
    const whereCondition = folderUUID ? { userId, folderUUID } : { userId };

    const reflections = await prisma.reflection.findMany({
      where: whereCondition,
      orderBy: { createdAt: "asc" },
      take: 20,
      select: {
        reflectionCUID: true,
        title: true,
        content: true,
        isPublic: true,
        isDailyReflection: true,
        isLearning: true,
        isAwareness: true,
        isInputLog: true,
        isMonologue: true,
        createdAt: true
      }
    });

    const folder = folderUUID
      ? await prisma.reflectionFolder.findFirst({
          where: { folderUUID, userId },
          select: { name: true }
        })
      : null;
    const folderName = folder ? folder.name : "";

    const count = folderUUID
      ? await prisma.reflection.count({
          where: { userId, folderUUID }
        })
      : null;

    return NextResponse.json({ reflections, folderName, count });
  } catch (error) {
    return internalServerError("GET", "古いReflection一覧", error);
  }
}
