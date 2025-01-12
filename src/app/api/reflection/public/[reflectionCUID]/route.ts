import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";
import { internalServerError } from "@/src/utils/http-error";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;
    const { isPublic } = await req.json();

    const res = await reflectionService.updatePublic(reflectionCUID, isPublic);

    return NextResponse.json(
      { message: "Reflection public successfully", data: res },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error patch reflection:", error);
    return internalServerError("PATCH", "投稿の公開設定", error);
  }
}
