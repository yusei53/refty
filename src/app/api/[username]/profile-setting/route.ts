import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { userService } from "@/src/app/_server/service/userService";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/app/_server/http-error";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";
import { getUserSession } from "@/src/app/_shared/get-user-session";

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
  try {
    const body = await req.json();

    const session = await getUserSession();
    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const res = userService.updateProfile({
      userId: session.id,
      ...body
    });

    revalidateTag(`profile-${session.username}`);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("PATCH", "プロフィール設定", error);
  }
}
