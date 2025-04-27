import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReflectionsBookPage from "./page.client";
import { reflectionsBookAPI } from "@/src/app/_client/api/reflections-book-api";
import { getUserSession } from "@/src/app/_client/utils/get-user-session";
import { meta } from "@/src/app/_client/utils/metadata";

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> => {
  const { username } = await params;
  return meta.reflectionsBookPage(username);
};

const page = async ({
  params,
  searchParams
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{
    folder?: string;
  }>;
}) => {
  const { username } = await params;
  const { folder: folderParameter } = await searchParams;
  const session = await getUserSession();
  const folderUUID = folderParameter || "";
  const res = await reflectionsBookAPI.getReflections(username, folderUUID);

  if (res === 404 || !res || !session || username !== session.username) {
    return notFound();
  }

  return (
    <ReflectionsBookPage
      reflections={res.reflections}
      username={session.username}
      userImage={session.image ?? ""}
      foldername={res.folderName}
      count={res.count}
    />
  );
};

export default page;
