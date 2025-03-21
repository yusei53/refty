import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prismaRandom from "prisma-extension-random";
import prisma from "@/src/lib/prisma";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { getUserSession } from "@/src/utils/get-user-session";
import {
  forbiddenError,
  internalServerError,
  notFoundError
} from "@/src/utils/http-error";

const customPrisma = prisma.$extends(prismaRandom());
export async function GET(
  _: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;

  if (!username) {
    return notFoundError("ユーザーネームが見つかりません");
  }

  const userId = await getUserIdByUsername(username);
  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }

  const session = await getUserSession();

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
