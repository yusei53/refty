import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/app/_server/http-error";
import { reflectionRepository } from "@/src/app/_server/infrastructure/repository/reflectionRepository";
import { reflectionService } from "@/src/app/_server/service/reflectionService";
import { getUserSession } from "@/src/app/_shared/get-user-session";

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
      await reflectionRepository.getReflectionRecord(reflectionCUID);

    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    if (process.env.NEXT_PUBLIC_TEST_ENV === "test") {
      return NextResponse.json(null, { status: 200 });
    }

    await reflectionRepository.deleteReflection(reflectionCUID);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return internalServerError("DELETE", "詳細ページ", error);
  }
}
