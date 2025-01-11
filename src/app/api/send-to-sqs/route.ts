import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { awsSQSService } from "@/src/service/awsSQSService";

export async function POST(req: NextRequest) {
  try {
    const { content, reflectionCUID } = await req.json();
    const res = await awsSQSService.publish({ content, reflectionCUID });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Error sending to SQS:", error);
    return new NextResponse("Error sending to SQS:", { status: 500 });
  }
}
