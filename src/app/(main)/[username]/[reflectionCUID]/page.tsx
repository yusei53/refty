import opengraphAPI from "@/src/api/opengraph-api";
import { reflectionAPI } from "@/src/api/reflection-api";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Loading from "./loading";

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
  const { reflectionCUID } = params;
  const reflection = await opengraphAPI.getOGPByCUID(reflectionCUID);
  if (reflection === 404) {
    return {
      title: "404",
      description: "このページは見つかりません",
      openGraph: {
        type: "website",
        title: "404 | リフティ",
        description: "このページは見つかりません",
        siteName: "リフティ"
      }
    };
  }

  return {
    title: `${reflection.title}`,
    description: `by ${reflection.user.username}`,
    openGraph: {
      type: "website",
      title: `${reflection.title} | リフティ`,
      description: `by ${reflection.user?.username}`,
      siteName: "リフティ"
    },
    twitter: {
      title: `${reflection.title} | リフティ`,
      description: `by ${reflection.user?.username}`,
      card: "summary_large_image"
    }
  };
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
      createdAt={reflection.createdAt}
      reflectionCount={reflection.reflectionCount}
    />
  );
};

export default page;
