import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { internalServerError } from "@/src/utils/http-error";

export async function GET(req: NextRequest) {
  try {
    const username = req.nextUrl.searchParams.get("username");
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
