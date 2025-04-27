import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { internalServerError } from "@/src/app/_client/utils/http-error";
import { reflectionRepository } from "@/src/app/_server/infrastructure/repository/reflectionRepository";

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
