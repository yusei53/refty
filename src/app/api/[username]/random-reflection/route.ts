import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prismaRandom from "prisma-extension-random";
import { forbiddenError, notFoundError } from "@/src/app/_server/http-error";
import { sessionHandler } from "@/src/app/_server/session-handler";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";
import prisma from "@/src/app/_shared/lib/prisma";

const customPrisma = prisma.$extends(prismaRandom());
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  return sessionHandler(
    req,
    "ランダムなReflection取得",
    async ({ session }) => {
      const { username } = await params;

      const userId = await getUserIdByUsername(username);
      if (!userId) {
        return notFoundError("ユーザーが見つかりません");
      }

      const isCurrentUser = session?.username === username;
      if (!isCurrentUser) {
        return forbiddenError("権限がありません");
      }

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
    }
  );
}
