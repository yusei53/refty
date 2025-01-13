import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import { userService } from "@/src/service/userService";
import { internalServerError, unauthorizedError } from "@/src/utils/http-error";

export async function PATCH(req: NextRequest) {
  try {
    const { username } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return unauthorizedError("認証されていません");
    }

    const res = await userService.updateUsername({
      userId: session.user.id,
      username
    });

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error(error);
    return internalServerError("PATCH", "ユーザー名変更", error);
  }
}
