import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "../../api/auth/[...nextauth]/options";
import ReflectionPostFormPage from "./page.client";
import { folderAPI } from "@/src/api/folder-api";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.reflectionPostFormPage;

const page = async () => {
  // MEMO: getServerSessionだと新規ユーザーのログイン後、投稿ページで/loginに行ってしまうのでこれを使う
  const session = await getServerSession(authOptions);

  if (!session?.user?.username) {
    redirect("/login");
  }

  const folders = await folderAPI.getFolder(session.user.username);

  if (folders === 404) {
    return notFound();
  }

  return (
    <ReflectionPostFormPage
      username={session.user.username}
      folders={folders}
    />
  );
};

export default page;
