import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ReflectionUpdateFormPage from "./page.client";
import { folderAPI } from "@/src/api/folder-api";
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

  const reflection =
    await reflectionAPI.getDetailReflectionByCUID(reflectionCUID);
  if (reflection === 404 || reflection.userId !== session?.user.id) {
    return notFound();
  }

  if (session?.user.username !== params.username) {
    redirect("/login");
  }

  const folders = await folderAPI.getFolder(session.user.username);

  if (folders === 404) {
    return notFound();
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
      folderUUID={reflection.folderUUID}
      folders={folders}
    />
  );
};

export default page;
