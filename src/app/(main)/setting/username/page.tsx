import { reflectionAPI } from "@/src/api/reflection-api";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import RootPage from "../../../page.client";

const description = "リフティのユーザーネーム設定ページ";
export const metadata: Metadata = {
  title: "ユーザーネーム設定",
  description: description,
  openGraph: {
    type: "website",
    url: "https://www.refty.jp/setting/username",
    title: "ユーザーネーム設定 | リフティ",
    description: description
  },
  twitter: {
    title: "ユーザーネーム設定 | リフティ",
    description: description
  }
};

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const currentUser = await getCurrentUser();
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const result = await reflectionAPI.getReflectionAll();
  if (result === 404) {
    return notFound();
  }

  //usernameが設定されている場合、/${currentUser.username}にリダイレクト
  if (currentUser?.username) {
    redirect(`/${currentUser.username}`);
  }

  return (
    <RootPage
      open
      currentUsername={currentUser?.username || null}
      reflections={result.reflections}
      currentPage={currentPage}
      totalPage={result.totalPage}
    />
  );
};

export default page;
