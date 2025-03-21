import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "../../api/auth/[...nextauth]/options";
import LoginFormPage from "./page.client";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.loginFormPage;

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.username) {
    redirect(`${session.user.username}`);
  }

  return <LoginFormPage />;
};

export default page;
