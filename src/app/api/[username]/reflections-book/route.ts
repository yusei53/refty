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

    const reflections = await prisma.reflection.findMany({
      where: { userId: user.id },
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
    return NextResponse.json({ reflections }, { status: 200 });
  } catch (error) {
    return internalServerError("GET", "古いReflection一覧", error);
  }
}
