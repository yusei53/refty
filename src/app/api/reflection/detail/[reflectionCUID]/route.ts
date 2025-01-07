import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionRepository } from "@/src/infrastructure/repository/reflectionRepository";
import prisma from "@/src/lib/prisma";
import { reflectionService } from "@/src/service/reflectionService";
import getCurrentUser from "@/src/utils/actions/get-current-user";
export async function GET(
  req: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;

    if (!reflectionCUID) {
      return NextResponse.json(
        { message: "Reflection CUID is required" },
        { status: 400 }
      );
    }

    const res = await reflectionService.getReflection(reflectionCUID);

    if (!res) {
      return NextResponse.json(
        { message: "Reflection not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(res);
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
    const {
      title,
      content,
      charStamp,
      isPublic,
      isDailyReflection,
      isLearning,
      isAwareness,
      isInputLog,
      isMonologue
    } = await req.json();
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

    const reflection =
      await reflectionRepository.getReflectionRecord(reflectionCUID);
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
        isPublic,
        isDailyReflection,
        isLearning,
        isAwareness,
        isInputLog,
        isMonologue
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

    const reflection = await reflectionService.delete(reflectionCUID);

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
