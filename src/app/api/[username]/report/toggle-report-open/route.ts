import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { notFoundError, internalServerError } from "@/src/utils/http-error";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
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

    return NextResponse.json(updatedIsReportOpen, { status: 200 });
  } catch (error) {
    return internalServerError("PATCH", "レポートの公開設定", error);
  }
}
