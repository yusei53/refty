import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { MonthlyReflectionList } from "./MonthlyReflectionList";
import { LinearLoading } from "@/src/components/loading";

type MonthlyReflectionListFetcherProps = {
  reflections: ReflectionWithIncludeContent[];
  username: string;
  userImage: string;
  isReady: boolean;
};

export const MonthlyReflectionListFetcher = ({
  reflections,
  username,
  userImage,
  isReady
}: MonthlyReflectionListFetcherProps) => {
  // TODO: Next.jsのバージョンを15に上げ、PPRを実装する際に消す
  if (!isReady) {
    return <LinearLoading />;
  }

  return (
    <MonthlyReflectionList
      reflections={reflections}
      username={username}
      userImage={userImage}
    />
  );
};
