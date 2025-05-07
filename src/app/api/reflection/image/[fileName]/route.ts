import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  unauthorizedError
} from "@/src/app/_server/http-error";
import { reflectionImageRepository } from "@/src/app/_server/infrastructure/supabase-storage/reflectionImageRepository";
import { getUserSession } from "@/src/app/_shared/get-user-session";

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  try {
    const session = await getUserSession();
    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const { fileName } = await params;

    const deleted = await reflectionImageRepository.deleteImage(fileName);

    return NextResponse.json({ deleted }, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("DELETE", "画像削除", error);
  }
}
