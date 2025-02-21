export const dynamic = "force-dynamic";
/*
Next.js のビルド時や静的最適化の文脈でこのAPIルートが評価されると、
nextUrl.searchParams を使っているために「Dynamic server usage」エラーが発生する。
おそらくユーザーが入力するたびに呼ばれる動的なAPIルートのため、常に動的に実行させるには
dynamic = "force-dynamic" を追加する必要がある。
https://nextjs.org/docs/messages/dynamic-server-error

謎なのはこのAPIだけCIエラーが起こること。クライアントで呼んでいるからか？
*/

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { internalServerError } from "@/src/utils/http-error";

export async function GET(req: NextRequest) {
  try {
    const username = req.nextUrl.searchParams.get("username") ?? undefined;

    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true }
    });

    return NextResponse.json({ exists: Boolean(user) });
  } catch (error) {
    return internalServerError("GET", "Username availability check", error);
  }
}
