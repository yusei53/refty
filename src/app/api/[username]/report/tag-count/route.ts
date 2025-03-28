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
    const isDailyReflectionCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        undefined,
        {
          isDailyReflection: true
        }
      );

    const isLearningCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        undefined,
        { isLearning: true }
      );

    const isAwarenessCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        undefined,
        { isAwareness: true }
      );

    const isMonologueCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        undefined,
        { isMonologue: true }
      );

    const isInputLogCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        undefined,
        {
          isInputLog: true
        }
      );

    return NextResponse.json({
      isDailyReflection: isDailyReflectionCount,
      isLearning: isLearningCount,
      isAwareness: isAwarenessCount,
      isMonologue: isMonologueCount,
      isInputLog: isInputLogCount
    });
  } catch (error) {
    return internalServerError("GET", "タグ別の投稿数", error);
  }
}
