import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";

export async function GET() {
  try {
    const tagCountList = await reflectionService.getTagCounts();

    return NextResponse.json({
      tagCountList
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error get reflection tag counts" },
      { status: 500 }
    );
  }
}
