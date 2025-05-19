import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prismaRandom from "prisma-extension-random";
import {
  forbiddenError,
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/app/_server/http-error";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";
import { getUserSession } from "@/src/app/_shared/get-user-session";
import prisma from "@/src/app/_shared/lib/prisma";

const customPrisma = prisma.$extends(prismaRandom());
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (!username) {
    return notFoundError("ユーザーネームが見つかりません");
  }

  const userId = await getUserIdByUsername(username);
  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }

  const session = await getUserSession();
  if (!session) {
    return unauthorizedError("認証されていません");
  }

  const isCurrentUser = session?.username === username;
  if (!isCurrentUser) {
    return forbiddenError("権限がありません");
  }
  try {
    const randomReflection = await customPrisma.reflection.findRandom({
      where: { userId },
      select: {
        reflectionCUID: true,
        title: true,
        charStamp: true,
        isPublic: true,
        isPinned: true,
        createdAt: true
      }
    });

    if (!randomReflection) {
      return notFoundError("Reflectionが見つかりません");
    }

    return NextResponse.json(randomReflection, { status: 200 });
  } catch (error) {
    return internalServerError("GET", "ランダムなReflection取得", error);
  }
}
