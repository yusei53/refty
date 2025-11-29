import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { userService } from "@/src/app/_server/service/userService";
import { sessionHandler } from "@/src/app/_server/session-handler";
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

    const profile = await userService.getProfile({ userId });

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return internalServerError("GET", "プロフィール設定ページ", error);
  }
}

export async function PATCH(req: NextRequest) {
  return sessionHandler(req, "プロフィール設定", async ({ session }) => {
    const body = await req.json();

    if (process.env.NEXT_PUBLIC_TEST_ENV === "test") {
      return NextResponse.json(null, { status: 201 });
    }

    const res = userService.updateProfile({
      userId: session.id,
      ...body
    });

    revalidateTag(`profile-${session.username}`);
    return NextResponse.json(res, { status: 201 });
  });
}
