import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sessionHandler } from "../../_server/session-handler";
import { userService } from "@/src/app/_server/service/userService";

export async function PATCH(req: NextRequest) {
  return sessionHandler(req, "ユーザー名変更", async ({ session }) => {
    const { username } = await req.json();

    const res = await userService.updateUsername({
      userId: session.id,
      username
    });

    return NextResponse.json(res, { status: 201 });
  });
}
