import prisma from "@/src/lib/prisma";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;

    const reflection = await prisma.reflection.findUnique({
      where: {
        reflectionCUID
      },
      select: {
        title: true,
        content: true,
        charStamp: true,
        isPublic: true,
        createdAt: true,
        userId: true,
        user: {
          select: { image: true, username: true }
        }
      }
    });

    if (!reflection) {
      return NextResponse.json(
        { message: "Reflection not found" },
        { status: 404 }
      );
    }

    const reflectionCount = await prisma.reflection.count({
      where: {
        userId: reflection.userId
      }
    });

    return NextResponse.json({
      ...reflection,
      reflectionCount,
      createdAt: reflection.createdAt.toISOString()
    });
  } catch (error) {
    console.error("Error fetching reflection:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { title, content, charStamp, isPublic } = await req.json();
    const { reflectionCUID } = params;

    if (!reflectionCUID) {
      return NextResponse.json(
        { message: "Reflection ID is required" },
        { status: 400 }
      );
    }

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("認証されていません", { status: 401 });
    }

    const reflection = await prisma.reflection.findUnique({
      where: { reflectionCUID }
    });

    if (!reflection) {
      return NextResponse.json(
        { message: "Reflection not found" },
        { status: 404 }
      );
    }

    if (reflection.userId !== currentUser.id) {
      return new NextResponse("権限がありません", { status: 403 });
    }

    const updatedReflection = await prisma.reflection.update({
      where: { reflectionCUID },
      data: {
        title,
        content,
        charStamp,
        isPublic
      }
    });

    revalidateTag(`reflections-${currentUser.username}`);
    revalidateTag("reflections-all");

    return NextResponse.json(updatedReflection, { status: 200 });
  } catch (error) {
    console.error("Error updating reflection:", error);
    return NextResponse.json(
      { message: "Error updating reflection" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("認証されていません", { status: 401 });
    }

    const reflection = await prisma.reflection.delete({
      where: { reflectionCUID }
    });

    if (!reflection) {
      return NextResponse.json(
        { message: "Reflection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Reflection deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting reflection:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
