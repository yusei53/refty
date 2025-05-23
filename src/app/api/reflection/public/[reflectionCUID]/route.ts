import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { internalServerError } from "@/src/app/_server/http-error";
import { reflectionRepository } from "@/src/app/_server/infrastructure/repository/reflectionRepository";

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
