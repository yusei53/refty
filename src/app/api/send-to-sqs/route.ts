import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { awsSQSService } from "@/src/app/_server/service/awsSQSService";
import { internalServerError } from "@/src/app/_server/http-error";

export async function POST(req: NextRequest) {
  try {
    const { content, reflectionCUID, AIType } = await req.json();
    const res = await awsSQSService.publish({
      content,
      reflectionCUID,
      AIType
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return internalServerError("POST", "SQSへのメッセージ送信", error);
  }
}
