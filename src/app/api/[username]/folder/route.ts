import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { sessionHandler } from "@/src/app/_server/session-handler";
import { getUserIdByUsername } from "@/src/app/_shared/actions/get-userId-by-username";
import prisma from "@/src/app/_shared/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const userId = await getUserIdByUsername(username);

  if (!userId) {
    return notFoundError("ユーザーが見つかりません");
  }

  try {
    const reflectionFolders = await prisma.reflectionFolder.findMany({
      where: { userId },
      select: {
        folderUUID: true,
        name: true,
        _count: {
          select: { reflections: true }
        }
      }
    });

    const folders = reflectionFolders.map((folder) => ({
      folderUUID: folder.folderUUID,
      name: folder.name,
      countByFolder: folder._count.reflections
    }));

    return NextResponse.json(folders, { status: 200 });
  } catch (error) {
    return internalServerError("GET", "フォルダ", error);
  }
}

export async function POST(req: NextRequest) {
  return sessionHandler(req, "フォルダ作成", async ({ session }) => {
    const { name } = await req.json();
    const folderUUID = uuidv4().replace(/-/g, "");

    const folder = await prisma.reflectionFolder.create({
      data: {
        folderUUID,
        name,
        userId: session.id
      }
    });

    revalidateTag(`${session.username}-folder`);

    return NextResponse.json(folder, { status: 201 });
  });
}
