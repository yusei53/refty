import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ReflectionUpdateFormPage from "./page.client";
import { folderAPI } from "@/src/api/folder-api";
import { reflectionAPI } from "@/src/api/reflection-api";
import { getHeaders } from "@/src/utils/get-headers";
import { getUserSession } from "@/src/utils/get-user-session";
import { generateMeta } from "@/src/utils/metadata";

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
