import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ReflectionPostFormPage from "./page.client";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.reflectionPostFormPage;

const page = async () => {
  // MEMO: getServerSessionだと新規ユーザーのログイン後、投稿ページで/loginに行ってしまうのでこれを使う
  const currentUser = await getCurrentUser();

  if (!currentUser?.username) {
    redirect("/login");
  }

  return <ReflectionPostFormPage username={currentUser.username} />;
};

export default page;
