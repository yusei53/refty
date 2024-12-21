import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;

    const reflection = await prisma.reflection.findUnique({
      where: {
        reflectionCUID
      },
      select: {
        title: true,
        user: {
          select: { image: true, username: true }
        }
      }
    });

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
