import prisma from "@/src/lib/prisma";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { NextRequest, NextResponse } from "next/server";

// MEMO: 結構複雑なので、コメント多め
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

    const totalReflections = await prisma.reflection.count({
      where: {
        userId
      }
    });

    const reflectionsDateByUsername = await prisma.reflection.findMany({
      where: {
        userId
      },
      select: {
        createdAt: true
      }
    });

    type DateCountMap = Record<string, number>;
    const formatDate = (createdAt: Date) =>
      createdAt.toISOString().split("T")[0];

    // 日付ごとにグループ化して投稿数を計算(groupBy)
    const countPerDate: DateCountMap = reflectionsDateByUsername.reduce(
      (dateCounts, currentValue) => {
        const date = formatDate(currentValue.createdAt);

        // 存在する日付の場合はカウントを増やす
        if (dateCounts[date]) {
          dateCounts[date] = dateCounts[date] + 1;
        } else {
          dateCounts[date] = 1;
        }

        return dateCounts;
      },
      // initialValue(初期値)として空のオブジェクトを渡す
      {} as DateCountMap
    );

    // 配列に変換
    const reflectionsPerDate = Object.entries(countPerDate).map(
      ([date, countReflections]) => ({ date, countReflections })
    );

    return NextResponse.json(
      {
        totalReflections, // 全体の投稿数
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
