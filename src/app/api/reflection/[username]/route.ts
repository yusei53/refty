import { NextResponse, type NextRequest } from "next/server";
import { notFoundError } from "@/src/app/_server/http-error";
import { reflectionService } from "@/src/app/_server/service/reflectionService";
import { sessionHandler } from "@/src/app/_server/session-handler";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  return sessionHandler(
    req,
    "ユーザーの振り返り一覧",
    async ({ req, session }) => {
      const { username } = await params;
      const isCurrentUser = session?.username === username;
      const userId = await getUserIdByUsername(username);
      if (!userId) {
        return notFoundError("ユーザーが見つかりません");
      }

      const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
      const tag = req.nextUrl.searchParams.get("tag") ?? undefined;
      const folder = req.nextUrl.searchParams.get("folder") ?? undefined;
      // TODO: isDetailModeをパラメータを渡された時のものは、Next15に移行したらAPIを別で作成する
      const isDetailMode =
        req.nextUrl.searchParams.get("viewMode") === "detail";

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
    }
  );
}
