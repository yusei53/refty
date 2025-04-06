import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UserReflectionListPage from "./page.client";
import { folderAPI } from "@/src/api/folder-api";
import { profileAPI } from "@/src/api/profile-api";
import { reflectionAPI } from "@/src/api/reflection-api";
import { reflectionsCountAPI } from "@/src/api/reflections-count-api";
import { getHeaders } from "@/src/utils/get-headers";
import { getUserSession } from "@/src/utils/get-user-session";
import { generateMeta } from "@/src/utils/metadata";

export const generateMetadata = async ({
  params
}: {
  params: { username: string };
}): Promise<Metadata> => {
  return await generateMeta.userReflectionListPage(params.username);
};

const page = async ({
  params,
  searchParams
}: {
  params: { username: string };
  searchParams: {
    page?: string;
    tag?: string;
    status?: string;
    folder?: string;
  };
}) => {
  const session = await getUserSession();
  const headers = getHeaders();
  const { username } = params;
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const selectedTag = searchParams.tag || undefined;
  const selectedFolder = searchParams.folder || undefined;
  const status = searchParams.status;

  const [profile, reflectionCount, reflectionsWithUser, folders] =
    await Promise.all([
      profileAPI.getUserProfileForMyPage(username),
      reflectionsCountAPI.getReflectionsCount(username),
      reflectionAPI.getReflectionsByUsername(
        headers,
        username,
        currentPage,
        selectedTag,
        selectedFolder
      ),
      folderAPI.getFolder(username)
    ]);

  if (
    profile === 404 ||
    reflectionCount === 404 ||
    reflectionsWithUser === 404 ||
    folders === 404
  ) {
    return notFound();
  }

  let randomReflection = null;
  if (status === "posted") {
    randomReflection = await reflectionAPI.getRandomReflection(
      headers,
      username
    );
    if (
      randomReflection === 403 ||
      randomReflection === 404 ||
      reflectionCount.totalReflections === "1"
    ) {
      randomReflection = null;
    }
  }

  return (
    <UserReflectionListPage
      currentUsername={session?.username || null}
      currentUserImage={session?.image || null}
      username={username}
      userImage={profile.image}
      bio={profile.bio}
      website={profile.website}
      reflectionCount={reflectionCount}
      reflections={reflectionsWithUser.reflections}
      currentPage={currentPage}
      totalPage={reflectionsWithUser.totalPage}
      tagCountList={reflectionsWithUser.tagCountList}
      randomReflection={randomReflection}
      folders={folders}
    />
  );
};

export default page;
