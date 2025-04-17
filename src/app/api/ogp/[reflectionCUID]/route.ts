import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { opengraphRepository } from "@/src/infrastructure/repository/opengraphRepository";
import { internalServerError, notFoundError } from "@/src/utils/http-error";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ reflectionCUID: string }> }
) {
  const { reflectionCUID } = await params;
  try {
    const reflection = await opengraphRepository.getReflection(reflectionCUID);
    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    return NextResponse.json({
      title: reflection.title,
      user: reflection.user
    });
  } catch (error) {
    return internalServerError("GET", "振り返り詳細ページのOGP", error);
  }
}
