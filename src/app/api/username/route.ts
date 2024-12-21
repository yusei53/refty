import prisma from "@/src/lib/prisma";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { username } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("認証されていません", { status: 401 });
    }

    const response = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        username: username
      }
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating posts" },
      { status: 500 }
    );
  }
}
