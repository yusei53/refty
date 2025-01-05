import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
  try {
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

    return NextResponse.json({
      tagCountList
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error get reflection tag counts" },
      { status: 500 }
    );
  }
}
