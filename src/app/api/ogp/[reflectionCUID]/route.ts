import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { opengraphRepository } from "@/src/infrastructure/repository/opengraphRepository";

export async function GET(
  request: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;

    const reflection = await opengraphRepository.getReflection(reflectionCUID);
    if (!reflection) {
      return NextResponse.json(
        { message: "Reflection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      title: reflection.title,
      user: reflection.user
    });
  } catch (error) {
    console.error("Error fetching reflection:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
