import getCurrentUser from "@/src/utils/actions/get-current-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ReflectionPostFormPage from "./page.client";

const description = "リフティの投稿作成ページ";
export const metadata: Metadata = {
  title: "投稿作成",
  description: description,
  openGraph: {
    type: "website",
    url: "https://www.refty.jp/post",
    title: "投稿作成 | リフティ",
    description: description
  },
  twitter: {
    title: "投稿作成 | リフティ",
    description: description
  }
};

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.username) {
    redirect("/login");
  }

  return <ReflectionPostFormPage username={currentUser.username} />;
};

export default page;
