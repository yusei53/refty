import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import authOptions from "../../auth/[...nextauth]/options";
import prisma from "@/src/lib/prisma";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/utils/http-error";

export async function GET(
  _: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;
  const user = await prisma.user.findUnique({
    where: { username }
  });
  if (!user) {
    return notFoundError("ユーザーが見つかりません");
  }

  try {
    const reflectionFolders = await prisma.reflectionFolder.findMany({
      where: { userId: user.id },
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
  try {
    const { name } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user.username) {
      return unauthorizedError("認証されていません");
    }

    const folderUUID = uuidv4().replace(/-/g, "");

    const folder = await prisma.reflectionFolder.create({
      data: {
        folderUUID,
        name,
        userId: session.user.id
      }
    });
    revalidateTag(`${session.user.username}-folder`);

    return NextResponse.json(folder, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("POST", "フォルダ", error);
  }
}
