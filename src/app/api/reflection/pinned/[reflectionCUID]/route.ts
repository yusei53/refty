import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;
    const { isPinned } = await req.json();

    const res = await reflectionService.updatedPinned(reflectionCUID, isPinned);

    return NextResponse.json(
      { message: "Reflection pinned successfully", data: res },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error patch reflection:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
