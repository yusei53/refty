import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ReflectionUpdateFormPage from "./page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import getCurrentUser from "@/src/utils/actions/get-current-user";

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { reflectionCUID } = params;
  const reflection = await reflectionAPI.getReflectionByCUID(reflectionCUID);
  const currentUser = await getCurrentUser();
  if (reflection === 404 || reflection.userId !== currentUser?.id) {
    {
      return {
        title: "投稿が見つかりません",
        description: "指定された投稿が存在しません"
      };
    }
  }

  return {
    title: `${reflection.title}を編集 | リフティ`,
    description: `${reflection.title}に関する詳細ページの編集画面です`,
    openGraph: {
      type: "website",
      url: `https://www.refty.jp/${reflectionCUID}`,
      title: `${reflection.title}を編集 | リフティ`,
      description: `${reflection.title}に関する詳細ページの編集画面です`
    },
    twitter: {
      title: `${reflection.title}を編集 | リフティ`,
      description: `${reflection.title}に関する詳細ページの編集画面です`
    }
  };
}

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
  if (reflection === 404 || reflection.userId !== currentUser?.id) {
    return notFound();
  }

  if (!currentUser?.username) {
    redirect("/login");
  }

  return (
    <ReflectionUpdateFormPage
      username={currentUser.username}
      reflectionCUID={reflectionCUID}
      title={reflection.title}
      content={reflection.content}
      charStamp={reflection.charStamp}
      isPublic={reflection.isPublic}
    />
  );
};

export default page;
