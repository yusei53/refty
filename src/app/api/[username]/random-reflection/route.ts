import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import prisma from "@/src/lib/prisma";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import {
  forbiddenError,
  internalServerError,
  notFoundError
} from "@/src/utils/http-error";

type Params = {
  params: {
    username: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const username = params.username;

    if (!username) {
      return notFoundError("ユーザーネームが見つかりません");
    }

    const userId = await getUserIdByUsername(username);
    const session = await getServerSession(authOptions);

    const isCurrentUser = session?.user.username === username;

    if (!isCurrentUser) {
      return forbiddenError("権限がありません");
    }

    if (!userId) {
      return notFoundError("ユーザーが見つかりません");
    }

    const randomReflection = await prisma.reflection.findRandom({
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
