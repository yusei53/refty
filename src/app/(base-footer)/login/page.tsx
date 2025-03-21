import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginFormPage from "./page.client";
import { getUserSession } from "@/src/utils/get-user-session";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.loginFormPage;

const page = async () => {
  const session = await getUserSession();
  if (session?.username) {
    redirect(`${session.username}`);
  }

  return <LoginFormPage />;
};

export default page;
