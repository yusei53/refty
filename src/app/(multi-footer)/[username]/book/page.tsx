import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { reflectionsBookAPI } from "@/src/api/reflections-book-api";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import { Loading } from "@/src/components/loading";
import { meta } from "@/src/utils/metadata";
import { folderAPI } from "@/src/api/folder-api";

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
  const session = await getServerSession(authOptions);
  const folderUUID = searchParams.folder || "";
  const folder = await folderAPI.getFolderByFolderUUID(
    params.username,
    folderUUID
  );
  if (folder === 404) {
    return notFound();
  }

  const res = await reflectionsBookAPI.getReflections(
    params.username,
    folderUUID
  );

  if (res === 404 || !res || params.username !== session?.user.username) {
    return notFound();
  }

  return (
    <ReflectionsBookPage
      reflections={res.reflections}
      username={session?.user.username ?? ""}
      userImage={session?.user.image ?? ""}
      foldername={folder?.name ?? ""}
    />
  );
};

export default page;
