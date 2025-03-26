import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reflectionService } from "@/src/service/reflectionService";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";
import { internalServerError } from "@/src/utils/http-error";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const userId = await getUserIdByUsername(username);

  try {
    const publicPrivateCount = await reflectionService.getPublicPrivateCount(
      userId!
    );

    return NextResponse.json(publicPrivateCount);
  } catch (error) {
    return internalServerError("GET", "公開・非公開の振り返り数", error);
  }
}
