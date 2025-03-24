import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReflectionsBookPage from "./page.client";
import { reflectionsBookAPI } from "@/src/api/reflections-book-api";
import { getUserSession } from "@/src/utils/get-user-session";
import { meta } from "@/src/utils/metadata";

export const generateMetadata = async ({
  params
}: {
  params: { username: string };
}): Promise<Metadata> => {
  return meta.reflectionsBookPage(params.username);
};

const page = async ({
  params,
  searchParams
}: {
  params: { username: string };
  searchParams: {
    folder?: string;
  };
}) => {
  const session = await getUserSession();
  const folderUUID = searchParams.folder || "";
  const res = await reflectionsBookAPI.getReflections(
    params.username,
    folderUUID
  );

  if (res === 404 || !res || !session || params.username !== session.username) {
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
