import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { forbiddenError, notFoundError } from "@/src/app/_server/http-error";
import { reflectionRepository } from "@/src/app/_server/infrastructure/repository/reflectionRepository";
import { reflectionService } from "@/src/app/_server/service/reflectionService";
import { sessionHandler } from "@/src/app/_server/session-handler";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ reflectionCUID: string }> }
) {
  return sessionHandler(req, "編集", async ({ session }) => {
    const { reflectionCUID } = await params;

    const reflection = await reflectionService.getDetail(reflectionCUID);
    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    if (reflection.userId !== session.id) {
      return forbiddenError("振り返りの編集権限がありません");
    }

    return NextResponse.json(reflection);
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ reflectionCUID: string }> }
) {
  return sessionHandler(req, "編集", async ({ session }) => {
    const { reflectionCUID } = await params;
    const body = await req.json();

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
  });
}
