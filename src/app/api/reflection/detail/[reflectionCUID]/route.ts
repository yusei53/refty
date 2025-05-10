import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { reflectionRepository } from "@/src/app/_server/infrastructure/repository/reflectionRepository";
import { reflectionService } from "@/src/app/_server/service/reflectionService";
import { sessionHandler } from "@/src/app/_server/session-handler";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ reflectionCUID: string }> }
) {
  const { reflectionCUID } = await params;
  try {
    const res = await reflectionService.getDetail(reflectionCUID);
    if (!res) {
      return notFoundError("振り返りが見つかりません");
    }
    return NextResponse.json(res);
  } catch (error) {
    return internalServerError("GET", "詳細ページ", error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ reflectionCUID: string }> }
) {
  return sessionHandler(req, "振り返り削除", async () => {
    const { reflectionCUID } = await params;
    const reflection =
      await reflectionRepository.deleteReflection(reflectionCUID);
    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }
    return NextResponse.json({ status: 200 });
  });
}
