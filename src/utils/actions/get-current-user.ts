"use server";
import prisma from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "../../app/api/auth/[...nextauth]/options";

// APIルートやサーバーサイドででユーザー情報が必要な場合に使用
const getCurrentUser = async () => {
  try {
    //セッション情報取得
    const session = await getServerSession(authOptions);

    // MEM0: ほんとはemailの方が速いけどdiscordログインはemailがないパターンがありidにしている
    if (!session?.user?.id) {
      return null;
    }

    const response = await prisma.user.findUnique({
      where: {
        id: session.user.id
      }
    });

    if (!response) {
      return null;
    }

    return response;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
