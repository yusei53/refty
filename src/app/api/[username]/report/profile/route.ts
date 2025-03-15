import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { userRepository } from "@/src/infrastructure/repository/userRepository";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { internalServerError, notFoundError } from "@/src/utils/http-error";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const userId = await getUserIdByUsername(username);

  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }

  try {
    const userProfile = await userRepository.getUserProfileForReport({
      username
    });

    if (!userProfile) {
      return notFoundError("プロフィール情報が見つかりません");
    }

    return NextResponse.json({
      image: userProfile.image,
      isReportOpen: userProfile.isReportOpen
    });
  } catch (error) {
    return internalServerError("GET", "プロフィール情報", error);
  }
}
