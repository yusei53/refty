import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { reflectionService } from "@/src/app/_server/service/reflectionService";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const userId = await getUserIdByUsername(username);
  if (!userId) return notFoundError("ユーザーが見つかりません");

  try {
    const publicPrivateCount =
      await reflectionService.getPublicPrivateCount(userId);

    return NextResponse.json(publicPrivateCount);
  } catch (error) {
    return internalServerError("GET", "公開・非公開の振り返り数", error);
  }
}
