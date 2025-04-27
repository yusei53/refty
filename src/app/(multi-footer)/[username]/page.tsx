import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ViewMode } from "@/src/app/_client/hooks/tabs/useViewMode";
import UserReflectionListPage from "./page.client";
import { folderAPI } from "@/src/app/_client/api/folder-api";
import { profileAPI } from "@/src/app/_client/api/profile-api";
import { reflectionAPI } from "@/src/app/_client/api/reflection-api";
import { reflectionsCountAPI } from "@/src/app/_client/api/reflections-count-api";
import { getHeaders } from "@/src/app/_client/utils/get-headers";
import { getUserSession } from "@/src/app/_client/utils/get-user-session";
import { generateMeta } from "@/src/app/_client/utils/metadata";

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
    viewMode: ViewMode;
  }>;
}) => {
  const { username } = await params;
  const {
    page: pageParameter,
    tag: tagParameter,
    status: statusParameter,
    folder: folderParameter,
    viewMode: viewModeParameter
  } = await searchParams;
  const session = await getUserSession();
  const headers = await getHeaders();
  const currentPage = pageParameter ? parseInt(pageParameter, 10) : 1;
  const selectedTag = tagParameter || undefined;
  const selectedFolder = folderParameter || undefined;
  const status = statusParameter || undefined;
  const viewMode = viewModeParameter === "detail" ? "detail" : "card";

  const [profile, reflectionCount, reflectionInfo, folders] = await Promise.all(
    [
      profileAPI.getUserProfileForMyPage(username),
      reflectionsCountAPI.getReflectionsCount(username),
      reflectionAPI.getReflectionsByUsername(
        headers,
        username,
        currentPage,
        selectedTag,
        selectedFolder,
        viewMode === "detail"
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
      viewMode={viewMode}
    />
  );
};

export default page;
