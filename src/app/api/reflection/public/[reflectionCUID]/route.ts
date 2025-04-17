import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionRepository } from "@/src/infrastructure/repository/reflectionRepository";
import { internalServerError } from "@/src/utils/http-error";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ reflectionCUID: string }> }
) {
  try {
    const { reflectionCUID } = await params;
    const { isPublic } = await req.json();

    const res = await reflectionRepository.updatePublicStatus({
      reflectionCUID,
      isPublic
    });

    return NextResponse.json(
      { message: "Reflection public successfully", data: res },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error patch reflection:", error);
    return internalServerError("PATCH", "投稿の公開設定", error);
  }
}
