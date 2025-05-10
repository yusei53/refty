import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sessionHandler } from "../../_server/session-handler";
import {
  internalServerError,
  notFoundError
} from "@/src/app/_server/http-error";
import { reflectionService } from "@/src/app/_server/service/reflectionService";

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
  return sessionHandler(req, "新規投稿", async ({ session }) => {
    const body = await req.json();

    if (process.env.NEXT_PUBLIC_APP_ENV === "playwright") {
      return NextResponse.json({ id: "dummy-id", ...body }, { status: 201 });
    }

    const reflection = await reflectionService.create({
      ...body,
      userId: session.id
    });

    revalidateTag(`reflections-${session.username}`);
    revalidateTag("reflections-all");

    return NextResponse.json(reflection, { status: 201 });
  });
}
