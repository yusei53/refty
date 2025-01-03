import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;
    const { isPinned } = await req.json();

    const response = await prisma.reflection.update({
      where: {
        reflectionCUID
      },
      data: {
        isPinned
      }
    });

    return NextResponse.json(
      { message: "Reflection pinned successfully", data: response },
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
