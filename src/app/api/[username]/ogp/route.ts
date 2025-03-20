import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { opengraphRepository } from "@/src/infrastructure/repository/opengraphRepository";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { internalServerError, notFoundError } from "@/src/utils/http-error";

export async function GET(
  _: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

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
