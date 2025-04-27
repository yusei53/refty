import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginFormPage from "./page.client";
import { meta } from "@/src/app/_client/utils/metadata";
import { getUserSession } from "@/src/app/_shared/get-user-session";

export const metadata: Metadata = meta.loginFormPage;

const page = async () => {
  const session = await getUserSession();
  if (session?.username) {
    redirect(`${session.username}`);
  }

  return <LoginFormPage />;
};

export default page;
