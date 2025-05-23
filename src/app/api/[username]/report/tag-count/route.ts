import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { reflectionRepository } from "@/src/app/_server/infrastructure/repository/reflectionRepository";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
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
