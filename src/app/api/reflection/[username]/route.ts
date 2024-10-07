import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;

  if (!username) {
    return NextResponse.json(
      { message: "ユーザー名が指定されていません" },
      { status: 400 }
    );
  }

  try {
    const userWithReflections = await prisma.user.findUnique({
      where: { username },
      select: {
        image: true,
        reflections: {
          orderBy: { createdAt: "desc" },
          select: {
            reflectionCUID: true,
            title: true,
            createdAt: true,
          },
        },
      },
    });
    if (!userWithReflections) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        reflections: userWithReflections.reflections,
        userImage: userWithReflections.image,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reflections:", error);
    return NextResponse.json(
      { message: "投稿の取得に失敗しました" },
      { status: 500 }
    );
  }
}