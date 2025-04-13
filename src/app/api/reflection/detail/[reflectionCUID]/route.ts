import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";
import { getUserSession } from "@/src/utils/get-user-session";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/utils/http-error";

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
    const reflection = await reflectionService.delete(reflectionCUID);

    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return internalServerError("DELETE", "詳細ページ", error);
  }
}
