import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import { userService } from "@/src/service/userService";

export async function PATCH(req: NextRequest) {
  try {
    const { username } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return new NextResponse("認証されていません", { status: 401 });
    }

    const res = await userService.updateUsername({
      userId: session.user.id,
      username
    });

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating posts" },
      { status: 500 }
    );
  }
}
