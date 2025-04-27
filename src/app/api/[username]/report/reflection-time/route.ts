import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionService } from "@/src/app/_server/service/reflectionService";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const userId = await getUserIdByUsername(username);
  if (!userId) return notFoundError("ユーザーが見つかりません");
  try {
    const reflectionsDateGroup =
      await reflectionService.getReflectionsByHourGroup(userId);

    return NextResponse.json({
      reflectionsDateGroup
    });
  } catch (error) {
    return internalServerError("GET", "ユーザーの振り返り時間帯一覧", error);
  }
}
