import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { reflectionAPI } from "../api/reflection-api";
import authOptions from "./api/auth/[...nextauth]/options";
import RootPage from "./page.client";

// MEMO: routePageのみmetadataをlayout.tsxで設定

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  // const currentUser = await getCurrentUser();
  const session = await getServerSession(authOptions);
  const result = await reflectionAPI.getReflectionAll(currentPage);
  if (result === 404) {
    return notFound();
  }

  return (
    <RootPage
      open={false}
      currentUsername={session?.user.username || null}
      reflections={result.reflections}
      currentPage={currentPage}
      totalPage={result.totalPage}
    />
  );
};

export default page;
