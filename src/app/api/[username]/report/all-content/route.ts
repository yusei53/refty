import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionRepository } from "@/src/app/_server/infrastructure/repository/reflectionRepository";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
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
