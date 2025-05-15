import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { notFoundError } from "@/src/app/_server/http-error";
import { userService } from "@/src/app/_server/service/userService";
import { sessionHandler } from "@/src/app/_server/session-handler";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  return sessionHandler(req, "プロフィール設定ページ", async () => {
    const { username } = await params;
    const userId = await getUserIdByUsername(username);
    if (!userId) {
      return notFoundError("ユーザーが見つかりません");
    }

    const profile = await userService.getProfile({ userId });

    return NextResponse.json(profile, { status: 200 });
  });
}

export async function PATCH(req: NextRequest) {
  return sessionHandler(req, "プロフィール設定", async ({ session }) => {
    const body = await req.json();

    const res = userService.updateProfile({
      userId: session.id,
      ...body
    });

    revalidateTag(`profile-${session.username}`);
    return NextResponse.json(res, { status: 201 });
  });
}
