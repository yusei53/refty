import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_client/utils/http-error";
import { opengraphRepository } from "@/src/app/_server/infrastructure/repository/opengraphRepository";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  try {
    const userId = await getUserIdByUsername(username);

    if (!userId) {
      return notFoundError("ユーザーが見つかりません");
    }

    const totalReflections =
      await opengraphRepository.getTotalReflections(userId);

    const image = await opengraphRepository.getUserImage(userId);

    return NextResponse.json(
      {
        totalReflections,
        user: image
      },
      { status: 200 }
    );
  } catch (error) {
    return internalServerError("GET", "ユーザーページのOGP", error);
  }
}
