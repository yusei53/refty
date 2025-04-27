import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { getUserSession } from "@/src/app/_client/utils/get-user-session";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/app/_client/utils/http-error";
import prisma from "@/src/lib/prisma";

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

    const folder = await prisma.reflectionFolder.delete({
      where: {
        folderUUID
      }
    });

    if (!folder) {
      return notFoundError("フォルダが見つかりません");
    }
    revalidateTag(`${session.username}-folder`);
    return NextResponse.json(folder, { status: 200 });
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
