import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import { reflectionService } from "@/src/service/reflectionService";
import {
  internalServerError,
  notFoundError,
  unauthorizedError
} from "@/src/utils/http-error";

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const tag = req.nextUrl.searchParams.get("tag") ?? undefined;

    const { reflections, totalPage } = await reflectionService.getAll(
      page,
      tag
    );

    if (!reflections) {
      return notFoundError("公開のみの投稿一覧が見つかりません");
    }

    return NextResponse.json({
      reflections,
      totalPage
    });
  } catch (error) {
    return internalServerError("GET", "公開のみの投稿一覧", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) {
      return unauthorizedError("認証されていません");
    }

    if (process.env.NEXT_PUBLIC_APP_ENV === "playwright") {
      return NextResponse.json({ id: "dummy-id", ...body }, { status: 201 });
    }
    const reflection = await reflectionService.create({
      ...body,
      userId: session.user.id
    });

    revalidateTag(`reflections-${session.user.username}`);
    revalidateTag("reflections-all");

    return NextResponse.json(reflection, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("POST", "新規投稿", error);
  }
}
