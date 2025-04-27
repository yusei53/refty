import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserSession } from "@/src/app/_client/utils/get-user-session";
import {
  forbiddenError,
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
  try {
    const { reflectionCUID } = await params;
    const session = await getUserSession();
    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const reflection = await reflectionService.getDetail(reflectionCUID);
    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    if (reflection.userId !== session.id) {
      return forbiddenError("振り返りの編集権限がありません");
    }

    return NextResponse.json(reflection);
  } catch (error) {
    return internalServerError("GET", "編集", error);
  }
}

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ reflectionCUID: string }> }
) {
  const params = await props.params;
  try {
    const body = await req.json();
    const { reflectionCUID } = params;
    const session = await getUserSession();
    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const reflection =
      await reflectionRepository.getReflectionRecord(reflectionCUID);
    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    if (reflection.userId !== session.id) {
      return forbiddenError("振り返りの編集権限がありません");
    }

    const updatedReflection = await reflectionService.update({
      reflectionCUID,
      ...body
    });

    revalidateTag(`reflections-${session.username}`);
    revalidateTag("reflections-all");

    return NextResponse.json(updatedReflection, { status: 200 });
  } catch (error) {
    return internalServerError("PATCH", "編集", error);
  }
}
