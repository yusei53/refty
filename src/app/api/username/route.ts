import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  internalServerError,
  unauthorizedError
} from "@/src/app/_client/utils/http-error";
import { userService } from "@/src/app/_server/service/userService";
import { getUserSession } from "@/src/app/_shared/get-user-session";

export async function PATCH(req: NextRequest) {
  try {
    const { username } = await req.json();
    const session = await getUserSession();

    if (!session) {
      return unauthorizedError("認証されていません");
    }

    const res = await userService.updateUsername({
      userId: session.id,
      username
    });

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("PATCH", "ユーザー名変更", error);
  }
}
