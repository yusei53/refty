import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionRepository } from "@/src/infrastructure/repository/reflectionRepository";
import { reflectionService } from "@/src/service/reflectionService";
import { getUserSession } from "@/src/utils/get-user-session";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/utils/http-error";

export async function GET(
  _: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  const { reflectionCUID } = params;
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
  _: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  const { reflectionCUID } = params;
  try {
    const session = await getUserSession();
    if (!session) {
      return unauthorizedError("認証されていません");
    }
    const reflection =
      await reflectionRepository.deleteReflection(reflectionCUID);

    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return internalServerError("DELETE", "詳細ページ", error);
  }
}
