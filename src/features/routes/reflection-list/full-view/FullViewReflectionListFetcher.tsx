import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { FullViewMonthlyReflectionListArea } from "./FullViewReflectionPaperListArea";
import { Loading } from "@/src/components/loading/Loading";

type FullViewReflectionListFetcherProps = {
  reflections: ReflectionWithIncludeContent[];
  username: string;
  userImage: string;
  isReady: boolean;
};

export const FullViewReflectionListFetcher = ({
  reflections,
  username,
  userImage,
  isReady
}: FullViewReflectionListFetcherProps) => {
  // TODO: Next.jsのバージョンを15に上げ、PPRを実装する際に消す
  if (!isReady) {
    return <Loading />;
  }

  return (
    <FullViewMonthlyReflectionListArea
      reflections={reflections}
      username={username}
      userImage={userImage}
    />
  );
};
