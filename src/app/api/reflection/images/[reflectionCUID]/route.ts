import { NextResponse } from "next/server";
import {
  badRequestError,
  internalServerError,
  unauthorizedError
} from "@/src/app/_server/http-error";
import { getUserSession } from "@/src/app/_shared/get-user-session";
import prisma from "@/src/app/_shared/lib/prisma";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ reflectionCUID: string }> }
) {
  try {
    const { reflectionCUID } = await params;
    const body = await req.json();
    const { imageUrls }: { imageUrls: string[] } = body;

    const session = await getUserSession();
    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const reflection = await prisma.reflection.findUnique({
      where: { reflectionCUID }
    });

    if (!reflection) {
      return badRequestError("指定された振り返りが存在しません");
    }

    if (!reflectionCUID) {
      return badRequestError("振り返りIDが指定されていません");
    }

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return badRequestError("画像URLが正しく指定されていません");
    }

    await prisma.reflectionImage.createMany({
      data: imageUrls.map((imageUrl: string, index: number) => ({
        reflectionCUID,
        imageUrl,
        orderIndex: index
      }))
    });

    return NextResponse.json(
      { message: "画像を投稿しました" },
      { status: 200 }
    );
  } catch (error) {
    internalServerError("POST", "画像投稿", error);
  }
}
