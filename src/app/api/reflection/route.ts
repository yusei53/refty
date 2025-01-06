import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";
import getCurrentUser from "@/src/utils/actions/get-current-user";

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const tag = req.nextUrl.searchParams.get("tag") ?? undefined;

    const { reflections, totalPage, filteredCount } =
      await reflectionService.getAll(page, tag);

    if (!reflections) {
      return NextResponse.json(
        { message: "振り返りが見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      reflections,
      totalPage,
      filteredReflectionCount: filteredCount
    });
  } catch (error) {
    return NextResponse.json({ message: "Error get posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("認証されていません", { status: 401 });
    }
    const reflection = await reflectionService.create({
      ...body,
      userId: currentUser.id
    });

    revalidateTag(`reflections-${currentUser.username}`);
    revalidateTag("reflections-all");

    return NextResponse.json(reflection, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating posts" },
      { status: 500 }
    );
  }
}
