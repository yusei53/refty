import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserIdByUsername } from "@/src/app/_client/utils/actions/get-userId-by-username";
import { getUserSession } from "@/src/app/_client/utils/get-user-session";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_client/utils/http-error";
import { reflectionService } from "@/src/service/reflectionService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
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
    // TODO: isDetailModeをパラメータを渡された時のものは、Next15に移行したらAPIを別で作成する
    const isDetailMode = req.nextUrl.searchParams.get("viewMode") === "detail";

    const { reflections, totalPage, filteredReflectionCount, tagCountList } =
      await reflectionService.getByUsername(
        userId,
        isCurrentUser,
        page,
        tag,
        folder,
        isDetailMode
      );

    if (!reflections) {
      return notFoundError("ユーザーの振り返り一覧が見つかりません");
    }

    return NextResponse.json({
      reflections,
      totalPage,
      filteredReflectionCount,
      tagCountList
    });
  } catch (error) {
    return internalServerError("GET", "ユーザーの振り返り一覧", error);
  }
}
