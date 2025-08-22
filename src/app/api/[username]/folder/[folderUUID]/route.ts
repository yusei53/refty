import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { notFoundError } from "@/src/app/_server/http-error";
import { sessionHandler } from "@/src/app/_server/session-handler";
import prisma from "@/src/app/_shared/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ username: string; folderUUID: string }> }
) {
  return sessionHandler(req, "フォルダ削除", async ({ session }) => {
    const { folderUUID } = await params;

    // TODO: 他人のフォルダを削除しようとした場合、403エラーが返される
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

    return NextResponse.json(folder, { status: 200 });
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ username: string; folderUUID: string }> }
) {
  return sessionHandler(req, "フォルダ更新", async ({ session }) => {
    const { folderUUID } = await params;
    const { name } = await req.json();

    const folder = await prisma.reflectionFolder.update({
      where: { folderUUID },
      data: { name }
    });

    if (!folder) {
      return notFoundError("フォルダが見つかりません");
    }

    revalidateTag(`${session.username}-folder`);

    return NextResponse.json(folder, { status: 200 });
  });
}
