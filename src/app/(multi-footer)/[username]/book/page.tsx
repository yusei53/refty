import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Loading from "./loading";
import { reflectionsBookAPI } from "@/src/api/reflections-book-api";
import { getUserSession } from "@/src/utils/get-user-session";
import { meta } from "@/src/utils/metadata";

const ReflectionsBookPage = dynamic(
  () => import("./page.client").then((mod) => mod.default),
  {
    loading: () => <Loading />
  }
);

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
