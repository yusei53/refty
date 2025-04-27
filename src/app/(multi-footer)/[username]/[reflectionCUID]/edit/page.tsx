import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ReflectionUpdateFormPage from "./page.client";
import { folderAPI } from "@/src/app/_client/api/folder-api";
import { reflectionAPI } from "@/src/app/_client/api/reflection-api";
import { getHeaders } from "@/src/app/_client/utils/get-headers";
import { generateMeta } from "@/src/app/_client/utils/metadata";
import { getUserSession } from "@/src/app/_shared/get-user-session";

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ reflectionCUID: string }>;
}): Promise<Metadata> => {
  const { reflectionCUID } = await params;
  return await generateMeta.reflectionUpdateFormPage(reflectionCUID);
};

const page = async ({
  params
}: {
  params: Promise<{ reflectionCUID: string }>;
}) => {
  const { reflectionCUID } = await params;
  const headers = await getHeaders();
  const session = await getUserSession();
  const reflection = await reflectionAPI.getEditReflectionByCUID(
    headers,
    reflectionCUID
  );
  if (reflection === 401 || !session?.username) {
    redirect("/login");
  }
  if (reflection === 403 || reflection === 404) {
    return notFound();
  }

  const folders = await folderAPI.getFolder(session.username);

  if (folders === 404) {
    return notFound();
  }

  return (
    <ReflectionUpdateFormPage
      username={session.username}
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
