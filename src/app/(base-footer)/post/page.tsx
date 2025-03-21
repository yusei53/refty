import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ReflectionPostFormPage from "./page.client";
import { folderAPI } from "@/src/api/folder-api";
import { getUserSession } from "@/src/utils/get-user-session";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.reflectionPostFormPage;

const page = async () => {
  const session = await getUserSession();

  if (!session?.username) {
    redirect("/login");
  }

  const folders = await folderAPI.getFolder(session.username);

  if (folders === 404) {
    return notFound();
  }

  return (
    <ReflectionPostFormPage username={session.username} folders={folders} />
  );
};

export default page;
