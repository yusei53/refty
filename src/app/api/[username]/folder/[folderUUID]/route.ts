import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/src/lib/prisma";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/utils/http-error";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { username: string; folderUUID: string } }
) {
  try {
    const { folderUUID } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
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

    return NextResponse.json(folder, { status: 200 });
  } catch (error) {
    console.error(error);
    return internalServerError("DELETE", "フォルダ", error);
  }
}
