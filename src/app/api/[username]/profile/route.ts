import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { userRepository } from "@/src/infrastructure/repository/userRepository";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { internalServerError, notFoundError } from "@/src/utils/http-error";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const userId = await getUserIdByUsername(username);
  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }

  try {
    const userProfile = await userRepository.getUserProfileForMyPage({
      userId
    });

    if (!userProfile) {
      return notFoundError("ユーザーのプロフィールが見つかりません");
    }

    return NextResponse.json({
      image: userProfile.image,
      bio: userProfile.bio,
      website: userProfile.website
    });
  } catch (error) {
    return internalServerError("GET", "ユーザーのプロフィール", error);
  }
}
