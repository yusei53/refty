import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import { reflectionService } from "@/src/service/reflectionService";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { internalServerError, notFoundError } from "@/src/utils/http-error";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;

  if (!username) {
    return notFoundError("ユーザーネームが見つかりません");
  }

  const userId = await getUserIdByUsername(username);
  const session = await getServerSession(authOptions);

  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
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
      return notFoundError("ユーザーの振り返り一覧が見つかりません");
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
    return internalServerError("GET", "ユーザーの振り返り一覧", error);
  }
}
