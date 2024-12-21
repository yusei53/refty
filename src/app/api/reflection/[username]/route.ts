import prisma from "@/src/lib/prisma";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const COUNT_PER_PAGE = 12;

  if (!username) {
    return NextResponse.json(
      { message: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  const userId = await getUserIdByUsername(username);

  if (!userId) {
    return NextResponse.json(
      { message: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const offset = (page - 1) * COUNT_PER_PAGE;

    const reflectionCount = await prisma.reflection.count({
      where: { userId }
    });

    const totalPage = Math.ceil(reflectionCount / COUNT_PER_PAGE);

    const userWithReflections = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        image: true,
        reflections: {
          where: { userId },
          orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
          take: COUNT_PER_PAGE,
          skip: offset,
          select: {
            title: true,
            reflectionCUID: true,
            charStamp: true,
            createdAt: true,
            isPublic: true,
            isPinned: true
          }
        }
      }
    });

    if (!userWithReflections) {
      return NextResponse.json(
        { message: "振り返りが見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      reflections: userWithReflections.reflections,
      userImage: userWithReflections.image,
      totalPage
    });
  } catch (error) {
    console.error("Error fetching user reflections:", error);
    return NextResponse.json(
      { message: "振り返りの取得に失敗しました" },
      { status: 500 }
    );
  }
}
