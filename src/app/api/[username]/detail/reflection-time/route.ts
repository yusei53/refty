import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
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

  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }

  try {
    const reflectionsDateGroup =
      await reflectionService.getReflectionsByHourGroup(userId);

    if (!reflectionsDateGroup) {
      return notFoundError("ユーザーの振り返りが見つかりません");
    }

    return NextResponse.json({
      reflectionsDateGroup
    });
  } catch (error) {
    return internalServerError("GET", "ユーザーの振り返り時間帯一覧", error);
  }
}
