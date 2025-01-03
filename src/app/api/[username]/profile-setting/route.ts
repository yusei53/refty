import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import prisma from "@/src/lib/prisma";
import { getUserIdByUsername } from "@/src/utils/actions/get-userId-by-username";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    const userId = await getUserIdByUsername(username);

    if (!userId) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    const profile = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        image: true,
        bio: true,
        goal: true,
        website: true
      }
    });

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return NextResponse.json(
      { message: "Contributions data could not be retrieved" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { username, bio, goal, website } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return new NextResponse("認証されていません", { status: 401 });
    }

    const response = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        username,
        bio,
        goal,
        website
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
