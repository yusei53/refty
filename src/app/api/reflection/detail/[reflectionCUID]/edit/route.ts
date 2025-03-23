import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionRepository } from "@/src/infrastructure/repository/reflectionRepository";
import { reflectionService } from "@/src/service/reflectionService";
import { getUserSession } from "@/src/utils/get-user-session";
import {
  forbiddenError,
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/utils/http-error";

export async function GET(
  req: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;
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
  { params }: { params: { reflectionCUID: string } }
) {
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
