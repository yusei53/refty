import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionRepository } from "@/src/infrastructure/repository/reflectionRepository";
import prisma from "@/src/lib/prisma";
import { internalServerError, notFoundError } from "@/src/utils/http-error";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) {
      return notFoundError("ユーザーが見つかりません");
    }

    const reflections = await reflectionRepository.getReflectionContent(
      user.id
    );

    // MEMO:文字列をすべて結合
    const allContent = reflections
      .map((reflection) => reflection.content || "")
      .join("");
    return NextResponse.json({ allContent });
  } catch (error) {
    return internalServerError("GET", "投稿内容を取得", error);
  }
}
