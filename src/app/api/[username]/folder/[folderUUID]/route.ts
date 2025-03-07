import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../../auth/[...nextauth]/options";
import prisma from "@/src/lib/prisma";
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
    const session = await getServerSession(authOptions);

    if (!session?.user.username) {
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
    revalidateTag(`${session.user.username}-folder`);
    return NextResponse.json(folder, { status: 200 });
  } catch (error) {
    console.error(error);
    return internalServerError("DELETE", "フォルダ", error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { username: string; folderUUID: string } }
) {
  try {
    const { folderUUID } = params;
    const { name } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user.username) {
      return unauthorizedError("認証されていません");
    }

    const folder = await prisma.reflectionFolder.update({
      where: { folderUUID },
      data: { name }
    });

    if (!folder) {
      return notFoundError("フォルダが見つかりません");
    }

    revalidateTag(`${session.user.username}-folder`);

    return NextResponse.json(folder, { status: 200 });
  } catch (error) {
    console.error(error);
    return internalServerError("PATCH", "フォルダ", error);
  }
}
