import "server-only";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";

export const getUserSession = async (): Promise<Session["user"] | null> => {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
};
