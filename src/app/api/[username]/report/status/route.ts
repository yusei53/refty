import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { getUserSession } from "@/src/utils/get-user-session";
import {
  forbiddenError,
  internalServerError,
  notFoundError
} from "@/src/utils/http-error";

export async function GET(
  _: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
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

    if (user?.isReportOpen === false && session?.username !== params.username) {
      return forbiddenError("閲覧権限がありません");
    }

    return NextResponse.json({
      isReportOpen: user?.isReportOpen,
      userImage: user?.image,
      session
    });
  } catch (error) {
    return internalServerError("GET", "ユーザーのレポートステータス取得", error);
  }
}
