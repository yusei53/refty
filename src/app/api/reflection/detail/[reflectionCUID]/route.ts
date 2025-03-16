import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../../auth/[...nextauth]/options";
import { reflectionRepository } from "@/src/infrastructure/repository/reflectionRepository";
import { reflectionService } from "@/src/service/reflectionService";
import {
  badRequestError,
  forbiddenError,
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/utils/http-error";

export async function GET(
  _: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;

    if (!reflectionCUID) {
      return badRequestError("ReflectionCUIDが必要です");
    }

    const res = await reflectionService.getDetail(reflectionCUID);

    if (!res) {
      return notFoundError("振り返りが見つかりません");
    }
    return NextResponse.json(res);
  } catch (error) {
    return internalServerError("GET", "詳細ページ", error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const body = await req.json();
    const { reflectionCUID } = params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const reflection =
      await reflectionRepository.getReflectionRecord(reflectionCUID);
    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    if (reflection.userId !== session.user.id) {
      return forbiddenError("振り返りの編集権限がありません");
    }

    const updatedReflection = await reflectionService.update({
      reflectionCUID,
      ...body
    });

    revalidateTag(`reflections-${session.user.username}`);
    revalidateTag("reflections-all");

    return NextResponse.json(updatedReflection, { status: 200 });
  } catch (error) {
    return internalServerError("PATCH", "詳細ページ", error);
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { reflectionCUID: string } }
) {
  try {
    const { reflectionCUID } = params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return unauthorizedError("認証されていません");
    }

    if (!session.user.id) {
      return unauthorizedError("認証されていません");
    }

    const reflection = await reflectionService.delete(reflectionCUID);

    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    return NextResponse.json(
      { message: "Reflection deleted" },
      { status: 200 }
    );
  } catch (error) {
    return internalServerError("DELETE", "詳細ページ", error);
  }
}
