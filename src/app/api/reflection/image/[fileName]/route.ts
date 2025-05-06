import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { internalServerError } from "@/src/app/_server/http-error";
import { reflectionImageRepository } from "@/src/app/_server/infrastructure/supabase-storage/reflectionImageRepository";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  try {
    // TODO: 認証の確認する
    // const session = await getUserSession();
    // if (!session) {
    //   return unauthorizedError("認証されていません");
    // }

    const { fileName } = await params;

    const deleted = await reflectionImageRepository.deleteImage(fileName);

    return NextResponse.json({ deleted }, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("DELETE", "画像削除", error);
  }
}
