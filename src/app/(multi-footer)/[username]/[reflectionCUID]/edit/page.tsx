import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ReflectionUpdateFormPage from "./page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import { generateMeta } from "@/src/utils/metadata";

export const generateMetadata = async ({
  params
}: {
  params: { reflectionCUID: string };
}): Promise<Metadata> => {
  return await generateMeta.reflectionUpdateFormPage(params.reflectionCUID);
};

type PageProps = {
  params: {
    username: string;
    reflectionCUID: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { reflectionCUID } = params;
  const session = await getServerSession(authOptions);

  const reflection = await reflectionAPI.getReflectionByCUID(reflectionCUID);
  if (reflection === 404 || reflection.userId !== session?.user.id) {
    return notFound();
  }

  if (session?.user.username !== params.username) {
    redirect("/login");
  }

  return (
    <ReflectionUpdateFormPage
      username={session.user.username}
      reflectionCUID={reflectionCUID}
      title={reflection.title}
      content={reflection.content}
      charStamp={reflection.charStamp}
      isPublic={reflection.isPublic}
      isDailyReflection={reflection.isDailyReflection}
      isLearning={reflection.isLearning}
      isAwareness={reflection.isAwareness}
      isInputLog={reflection.isInputLog}
      isMonologue={reflection.isMonologue}
    />
  );
};

export default page;
