import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import { reflectionService } from "@/src/service/reflectionService";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;

  if (!username) {
    return NextResponse.json(
      { message: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  const userId = await getUserIdByUsername(username);
  const session = await getServerSession(authOptions);

  if (!userId) {
    return NextResponse.json(
      { message: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  const isCurrentUser = session?.user.username === username;

  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const tag = req.nextUrl.searchParams.get("tag") ?? undefined;
    const {
      userWithReflections,
      totalPage,
      filteredReflectionCount,
      tagCountList
    } = await reflectionService.getByUsername(page, userId, isCurrentUser, tag);

    if (!userWithReflections) {
      return NextResponse.json(
        { message: "振り返りが見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      reflections: userWithReflections.reflections,
      userImage: userWithReflections.image,
      bio: userWithReflections.bio,
      goal: userWithReflections.goal,
      website: userWithReflections.website,
      totalPage,
      filteredReflectionCount,
      tagCountList
    });
  } catch (error) {
    console.error("Error fetching user reflections:", error);
    return NextResponse.json(
      { message: "振り返りの取得に失敗しました" },
      { status: 500 }
    );
  }
}
