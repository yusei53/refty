import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { forbiddenError, notFoundError } from "@/src/app/_server/http-error";
import { sessionHandler } from "@/src/app/_server/session-handler";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";
import prisma from "@/src/app/_shared/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  return sessionHandler(req, "レポートステータス取得", async ({ session }) => {
    const { username } = await params;
    const userId = await getUserIdByUsername(username);
    if (!userId) {
      return notFoundError("ユーザーが見つかりません");
    }

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
  });
}
