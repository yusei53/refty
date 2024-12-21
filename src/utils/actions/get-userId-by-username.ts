"use server";
import prisma from "@/src/lib/prisma";

// MEMO: route handlerで使用
export const getUserIdByUsername = async (
  username: string
): Promise<string | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      },
      select: {
        id: true
      }
    });

    if (!user) {
      return null;
    }

    return user.id;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};
