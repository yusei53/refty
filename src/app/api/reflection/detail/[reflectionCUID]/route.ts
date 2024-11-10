import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;

    const reflection = await prisma.reflection.findUnique({
      where: {
        reflectionCUID,
      },
      select: {
        title: true,
        content: true,
        charStamp: true,
        isPublic: true,
        createdAt: true,
        userId: true,
        user: {
          select: { image: true, username: true },
        },
      },
    });

    if (!reflection) {
      return NextResponse.json(
        { message: "Reflection not found" },
        { status: 404 }
      );
    }

    //MEMO: ほんとはここで公開非公開の設定したいけどcurrentUserのidがが取れないからコンポーネントでやってる
    // if (reflection.userId !== currentUser?.id && !reflection.isPublic) {
    //   return NextResponse.json(
    //     { message: "Unauthorized access to this reflection" },
    //     { status: 403 }
    //   );
    // }

    return NextResponse.json({
      ...reflection,
      createdAt: reflection.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching reflection:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}