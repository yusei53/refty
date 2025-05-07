import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  badRequestError,
  internalServerError,
  unauthorizedError
} from "@/src/app/_server/http-error";
import { reflectionImageRepository } from "@/src/app/_server/infrastructure/supabase-storage/reflectionImageRepository";
import { getUserSession } from "@/src/app/_shared/get-user-session";

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return badRequestError("ファイルがありません");
    }

    const uploadReflectionImageItem = {
      file,
      path: `reflection-images/${Date.now()}-${file.name}`
    };

    const imageUrl = await reflectionImageRepository.uploadImage(
      uploadReflectionImageItem
    );

    revalidateTag("reflections-all");

    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("POST", "新規投稿", error);
  }
}
