import { Metadata } from "next";
import LoginFormPage from "./page.client";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { redirect } from "next/navigation";

const description = "リフティのログインページ";
export const metadata: Metadata = {
  title: "ログイン",
  description: description,
  openGraph: {
    type: "website",
    url: "https://www.refty.jp/login",
    title: "ログイン | リフティ",
    description: description,
  },
  twitter: {
    title: "ログイン | リフティ",
    description: description,
  },
};

const page = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect(`${currentUser.username}`);
  }

  return <LoginFormPage />;
};

export default page;
