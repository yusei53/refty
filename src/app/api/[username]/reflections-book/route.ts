import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { internalServerError, notFoundError } from "@/src/utils/http-error";

type Params = {
  params: {
    username: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  const { username } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) {
      return notFoundError("ユーザーが見つかりません");
    }

    const folderUUID = req.nextUrl.searchParams.get("folder") ?? undefined;

    // folderUUIDが指定されていれば、そのフォルダに属する反映のみ取得、なければ全反映を取得
    const whereCondition = folderUUID
      ? { userId: user.id, folderUUID }
      : { userId: user.id };

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
          where: { folderUUID, userId: user.id },
          select: { name: true }
        })
      : null;
    const folderName = folder ? folder.name : "";

    const count = folderUUID
      ? await prisma.reflection.count({
          where: { userId: user.id, folderUUID }
        })
      : null;

    return NextResponse.json({ reflections, folderName, count });
  } catch (error) {
    return internalServerError("GET", "古いReflection一覧", error);
  }
}
