import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  forbiddenError,
  internalServerError,
  notFoundError
} from "@/src/app/_client/utils/http-error";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";
import { getUserSession } from "@/src/app/_shared/get-user-session";
import prisma from "@/src/app/_shared/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const userId = await getUserIdByUsername(username);
  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }
  const session = await getUserSession();
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true, isReportOpen: true }
    });

    if (user?.isReportOpen === false && session?.username !== username) {
      return forbiddenError("閲覧権限がありません");
    }

    return NextResponse.json({
      isReportOpen: user?.isReportOpen,
      userImage: user?.image,
      session
    });
  } catch (error) {
    return internalServerError(
      "GET",
      "ユーザーのレポートステータス取得",
      error
    );
  }
}
