import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";
import { internalServerError } from "@/src/utils/http-error";

export async function GET() {
  try {
    const tagCountList = await reflectionService.getTagCounts();

    return NextResponse.json({
      tagCountList
    });
  } catch (error) {
    return internalServerError("GET", "タグ別の投稿数", error);
  }
}
