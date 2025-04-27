import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { reflectionService } from "@/src/app/_server/service/reflectionService";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";

// MEMO: マイページとレポートページで使用しているので変更時は注意
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  try {
    const userId = await getUserIdByUsername(username);

    if (!userId) {
      return notFoundError("ユーザーが見つかりません");
    }

    const { total, reflectionsPerDate } =
      await reflectionService.getCountByUsername(userId);

    return NextResponse.json(
      {
        totalReflections: total, // 全体の投稿数
        reflectionsPerDate // 日付ごとの投稿数
      },
      { status: 200 }
    );
  } catch (error) {
    return internalServerError("GET", "ユーザーの投稿数", error);
  }
}
