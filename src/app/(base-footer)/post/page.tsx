import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "../../api/auth/[...nextauth]/options";
import ReflectionPostFormPage from "./page.client";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.reflectionPostFormPage;

const page = async () => {
  // MEMO: getServerSessionだと新規ユーザーのログイン後、投稿ページで/loginに行ってしまうのでこれを使う
  const session = await getServerSession(authOptions);

  if (!session?.user?.username) {
    redirect("/login");
  }

  return <ReflectionPostFormPage username={session.user.username} />;
};

export default page;
