import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { internalServerError } from "@/src/app/_server/http-error";
import { reflectionImagesRepository } from "@/src/app/_server/infrastructure/supabase-storage/reflectionImagesRepository";

export async function POST(req: NextRequest) {
  try {
    // const session = await getUserSession();
    // if (!session) {
    //   return unauthorizedError("認証されていません");
    // }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadReflectionImageItems = files.map((file) => ({
      file,
      path: `reflection-images/${Date.now()}-${file.name}`
    }));

    const imageUrls = await reflectionImagesRepository.uploadImages(
      uploadReflectionImageItems
    );

    console.log("imageUrls", imageUrls);

    revalidateTag("reflections-all");

    return NextResponse.json(imageUrls, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("POST", "新規投稿", error);
  }
}
