"use server";
import { getUserIdByUsername } from "../../../_shared/actions/get-userId-by-username";
import prisma from "@/src/app/_shared/lib/prisma";

type FolderInfo = {
  reflectionCUID: string;
  folderUUID: string | null;
};

// MEMO: エッジケースなデータ取得は一旦serverActionで対応
export const getReflectionWithFolderInfo = async (
  username: string,
  folderUUID: string
): Promise<FolderInfo[] | null> => {
  try {
    const userId = await getUserIdByUsername(username);
    if (!userId) return null;
    const info = await prisma.reflection.findMany({
      where: {
        userId,
        folderUUID
      },
      select: {
        reflectionCUID: true,
        folderUUID: true
      }
    });
    return info;
  } catch (error) {
    console.error("Error fetching folder info:", error);
    return null;
  }
};
