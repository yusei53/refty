import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    const userId = await getUserIdByUsername(username);

    if (!userId) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません" },
        { status: 404 }
      );
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
    console.error("Error fetching contributions:", error);
    return NextResponse.json(
      { message: "Contributions data could not be retrieved" },
      { status: 500 }
    );
  }
}
