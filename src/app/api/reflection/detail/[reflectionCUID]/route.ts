import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserSession } from "@/src/app/_client/utils/get-user-session";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/app/_client/utils/http-error";
import { reflectionRepository } from "@/src/app/_server/infrastructure/repository/reflectionRepository";
import { reflectionService } from "@/src/app/_server/service/reflectionService";

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
  _: NextRequest,
  props: { params: Promise<{ reflectionCUID: string }> }
) {
  const params = await props.params;
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
