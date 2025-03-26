import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { internalServerError } from "@/src/utils/http-error";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const userId = await getUserIdByUsername(username);
  try {
    const reflectionsDateGroup =
      await reflectionService.getReflectionsByHourGroup(userId!);

    return NextResponse.json({
      reflectionsDateGroup
    });
  } catch (error) {
    return internalServerError("GET", "ユーザーの振り返り時間帯一覧", error);
  }
}
