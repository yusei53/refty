import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { toJST } from "@/src/utils/date-helper";

export async function GET(req: NextRequest) {
  try {
    const COUNT_PER_PAGE = 12;

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const offset = (page - 1) * COUNT_PER_PAGE;

    const tag = req.nextUrl.searchParams.get("tag");
    const tagFilter = tag && { [tag]: true };

    const filteredReflectionCount = await prisma.reflection.count({
      where: {
        isPublic: true,
        ...tagFilter
      }
    });

    const totalPage = Math.ceil(filteredReflectionCount / COUNT_PER_PAGE);

    const reflections = await prisma.reflection.findMany({
      where: { isPublic: true, ...tagFilter },
      orderBy: { createdAt: "desc" },
      take: COUNT_PER_PAGE,
      skip: offset,
      select: {
        title: true,
        reflectionCUID: true,
        charStamp: true,
        createdAt: true,
        isPublic: true,
        user: {
          select: {
            username: true,
            image: true
          }
        }
      }
    });

    // MEMO: タグ別の投稿数を全て取得しておく
    const isDailyReflectionCount = await prisma.reflection.count({
      where: { isPublic: true, isDailyReflection: true }
    });
    const isLearningCount = await prisma.reflection.count({
      where: { isPublic: true, isLearning: true }
    });
    const isAwarenessCount = await prisma.reflection.count({
      where: { isPublic: true, isAwareness: true }
    });
    const isMonologueCount = await prisma.reflection.count({
      where: { isPublic: true, isMonologue: true }
    });
    const isInputLogCount = await prisma.reflection.count({
      where: { isPublic: true, isInputLog: true }
    });

    const tagCountList = {
      isDailyReflection: isDailyReflectionCount,
      isLearning: isLearningCount,
      isAwareness: isAwarenessCount,
      isMonologue: isMonologueCount,
      isInputLog: isInputLogCount
    };

    console.log(tagCountList);

    if (!reflections) {
      return NextResponse.json(
        { message: "振り返りが見つかりません" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      reflections,
      totalPage,
      filteredReflectionCount,
      tagCountList
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error get posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      content,
      charStamp,
      isPublic,
      isDailyReflection,
      isLearning,
      isAwareness,
      isInputLog,
      isMonologue
    } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("認証されていません", { status: 401 });
    }
    const now = new Date();
    const jstDate = toJST(now);

    const reflection = await prisma.reflection.create({
      data: {
        title,
        content,
        charStamp,
        isPublic,
        isDailyReflection,
        isLearning,
        isAwareness,
        isInputLog,
        isMonologue,
        createdAt: jstDate,
        userId: currentUser.id
      }
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
