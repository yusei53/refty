import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionRepository } from "@/src/infrastructure/repository/reflectionRepository";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { internalServerError, notFoundError } from "@/src/utils/http-error";

export async function GET(
  _: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const userId = await getUserIdByUsername(username);
  if (!userId) return notFoundError("ユーザーが見つかりません");
  try {
    const reflections = await reflectionRepository.getReflectionContent(userId);
    // MEMO:文字列をすべて結合
    const allContent = reflections
      .map((reflection) => reflection.content || "")
      .join("");
    return NextResponse.json({ allContent });
  } catch (error) {
    return internalServerError("GET", "投稿内容を取得", error);
  }
}
