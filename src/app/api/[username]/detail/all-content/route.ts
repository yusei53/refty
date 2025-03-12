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
      select: {
        content: true
      }
    });

    // MEMO:文字列をすべて結合
    const allContent = reflections
      .map((reflection) => reflection.content || "")
      .join("");
    return NextResponse.json({ allContent });
  } catch (error) {
    return internalServerError("GET", "投稿内容を取得", error);
  }
}
