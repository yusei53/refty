import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { getUserSession } from "@/src/utils/get-user-session";
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
  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }
  const session = await getUserSession();
  const isCurrentUser = session?.username === username;

  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const tag = req.nextUrl.searchParams.get("tag") ?? undefined;
    const folder = req.nextUrl.searchParams.get("folder") ?? undefined;

    const {
      userWithReflections,
      totalPage,
      filteredReflectionCount,
      tagCountList
    } = await reflectionService.getByUsername(
      userId,
      isCurrentUser,
      page,
      tag,
      folder
    );

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
