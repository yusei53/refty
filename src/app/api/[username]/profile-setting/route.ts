import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import { userService } from "@/src/service/userService";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/utils/http-error";

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

    const profile = await userService.getProfile({ userId });

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return internalServerError("GET", "プロフィール設定ページ", error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return unauthorizedError("認証されていません");
    }

    const res = userService.updateProfile({
      userId: session.user.id,
      ...body
    });

    revalidateTag(`profile-${session.user.username}`);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("PATCH", "プロフィール設定", error);
  }
}
