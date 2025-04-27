import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  notFoundError,
  internalServerError
} from "@/src/app/_server/http-error";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";
import prisma from "@/src/app/_shared/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const userId = await getUserIdByUsername(username);

  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }

  try {
    const { isReportOpen } = await req.json();

    const updatedIsReportOpen = await prisma.user.update({
      where: { id: userId },
      data: { isReportOpen }
    });

    return NextResponse.json(
      { isReportOpen: updatedIsReportOpen.isReportOpen },
      { status: 200 }
    );
  } catch (error) {
    return internalServerError("PATCH", "レポートの公開設定", error);
  }
}
