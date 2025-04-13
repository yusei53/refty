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
  params: Promise<{ username: string }>;
}): Promise<Metadata> => {
  const { username } = await params;
  return await generateMeta.userReflectionListPage(username);
};

const page = async ({
  params,
  searchParams
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{
    page?: string;
    tag?: string;
    status?: string;
    folder?: string;
  }>;
}) => {
  const { username } = await params;
  const {
    page: pageParameter,
    tag: tagParameter,
    status: statusParameter,
    folder: folderParameter
  } = await searchParams;
  const session = await getUserSession();
  const headers = await getHeaders();
  const currentPage = pageParameter ? parseInt(pageParameter, 10) : 1;
  const selectedTag = tagParameter || undefined;
  const selectedFolder = folderParameter || undefined;
  const status = statusParameter || undefined;

  const [profile, reflectionCount, reflectionInfo, folders] = await Promise.all(
    [
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
    ]
  );

  if (
    profile === 404 ||
    reflectionCount === 404 ||
    reflectionInfo === 404 ||
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
      reflections={reflectionInfo.reflections}
      currentPage={currentPage}
      totalPage={reflectionInfo.totalPage}
      tagCountList={reflectionInfo.tagCountList}
      randomReflection={randomReflection}
      folders={folders}
    />
  );
};

export default page;
