import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/app/_server/http-error";
import { getUserSession } from "@/src/app/_shared/get-user-session";
import prisma from "@/src/app/_shared/lib/prisma";

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ username: string; folderUUID: string }> }
) {
  const { folderUUID } = await params;
  try {
    const session = await getUserSession();

    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const folder = await prisma.reflectionFolder.findUnique({
      where: {
        folderUUID
      }
    });

    if (!folder) {
      return notFoundError("フォルダが見つかりません");
    }

    if (process.env.NEXT_PUBLIC_TEST_ENV === "test") {
      return NextResponse.json(null, { status: 200 });
    }

    await prisma.reflectionFolder.delete({
      where: {
        folderUUID
      }
    });

    revalidateTag(`${session.username}-folder`);
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return internalServerError("DELETE", "フォルダ", error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ username: string; folderUUID: string }> }
) {
  const { folderUUID } = await params;
  try {
    const { name } = await req.json();
    const session = await getUserSession();

    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const folder = await prisma.reflectionFolder.update({
      where: { folderUUID },
      data: { name }
    });

    if (!folder) {
      return notFoundError("フォルダが見つかりません");
    }

    revalidateTag(`${session.username}-folder`);

    return NextResponse.json(folder, { status: 200 });
  } catch (error) {
    console.error(error);
    return internalServerError("PATCH", "フォルダ", error);
  }
}
