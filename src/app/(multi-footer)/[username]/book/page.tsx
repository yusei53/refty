import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { reflectionsBookAPI } from "@/src/api/reflections-book-api";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import { Loading } from "@/src/components/loading";
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

const page = async ({ params }: { params: { username: string } }) => {
  const session = await getServerSession(authOptions);

  const res = await reflectionsBookAPI.getReflections(params.username);
  if (res === 404 || !res || params.username !== session?.user.username) {
    return notFound();
  }

  return (
    <ReflectionsBookPage
      reflections={res.reflections}
      username={session?.user.username ?? ""}
      userImage={session?.user.image ?? ""}
    />
  );
};

export default page;
