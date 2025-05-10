import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { reflectionService } from "@/src/app/_server/service/reflectionService";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";
import { getUserSession } from "@/src/app/_shared/get-user-session";

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

  const reflectionDate =
    req.nextUrl.searchParams.get("reflectionDate") ?? undefined;

  try {
    const reflectionsByDate = await reflectionService.getReflectionsByDate(
      userId,
      isCurrentUser,
      reflectionDate
    );

    if (!reflectionsByDate) {
      return notFoundError("ユーザーの振り返り一覧が見つかりません");
    }

    return NextResponse.json(reflectionsByDate);
  } catch (error) {
    return internalServerError("GET", "ユーザーの振り返り一覧", error);
  }
}
