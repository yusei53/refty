export const dynamic = "force-dynamic";
/*
おそらく"req.nextUrl.searchParams"はサーバーサイドのみで利用可能あるが、
RHFのバリデーションチェックで使うため、クライアントサイドで呼ばれている。
そのためCIで怒られ、回避としてforce-dynamicを付与している
*/

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { internalServerError } from "@/src/utils/http-error";

export async function GET(req: NextRequest) {
  try {
    const username = req.nextUrl.searchParams.get("username") ?? undefined;
    if (!username) return;

    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true }
    });

    return NextResponse.json({ exists: Boolean(user) });
  } catch (error) {
    return internalServerError("GET", "Username availability check", error);
  }
}
