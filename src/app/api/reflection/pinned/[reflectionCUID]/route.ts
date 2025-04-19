import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionRepository } from "@/src/infrastructure/repository/reflectionRepository";
import { internalServerError } from "@/src/utils/http-error";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ reflectionCUID: string }> }
) {
  const { reflectionCUID } = await params;
  try {
    const { isPinned } = await req.json();

    const res = await reflectionRepository.updatePinnedStatus({
      reflectionCUID,
      isPinned
    });

    return NextResponse.json(
      { message: "Reflection pinned successfully", data: res },
      { status: 200 }
    );
  } catch (error) {
    return internalServerError("PATCH", "投稿のピン留め", error);
  }
}
