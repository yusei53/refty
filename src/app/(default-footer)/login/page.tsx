import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginFormPage from "./page.client";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { meta } from "@/src/utils/metadata/metadata";

export const metadata: Metadata = meta.loginFormPage;

const page = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect(`${currentUser.username}`);
  }

  return <LoginFormPage />;
};

export default page;
