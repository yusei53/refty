import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Loading from "./loading";
import { reflectionAPI } from "@/src/api/reflection-api";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { generateMeta } from "@/src/utils/metadata/generateMetadata";

const ReflectionDetailPage = dynamic(
  () => import("./page.client").then((mod) => mod.default),
  {
    loading: () => <Loading />
  }
);

export const generateMetadata = async ({
  params
}: {
  params: { reflectionCUID: string };
}): Promise<Metadata> => {
  return await generateMeta.reflectionDetailPage(params.reflectionCUID);
};

type PageProps = {
  params: {
    username: string;
    reflectionCUID: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { reflectionCUID } = params;

  const currentUser = await getCurrentUser();

  const reflection = await reflectionAPI.getReflectionByCUID(reflectionCUID);
  if (
    reflection === 404 ||
    (reflection.userId !== currentUser?.id && !reflection.isPublic)
  ) {
    return notFound();
  }

  return (
    <ReflectionDetailPage
      title={reflection.title}
      userImage={reflection.user.image}
      username={reflection.user.username}
      content={reflection.content}
      isDailyReflection={reflection.isDailyReflection}
      isLearning={reflection.isLearning}
      isAwareness={reflection.isAwareness}
      isInputLog={reflection.isInputLog}
      isMonologue={reflection.isMonologue}
      createdAt={reflection.createdAt}
      reflectionCount={reflection.reflectionCount}
    />
  );
};

export default page;
