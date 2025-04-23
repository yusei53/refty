import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { FullViewReflectionPaperListArea } from "./FullViewReflectionPaperListArea";
import { Loading } from "@/src/components/loading/Loading";

type FullViewReflectionListFetcherProps = {
  reflections: ReflectionWithIncludeContent[];
  username: string;
  userImage: string;
  isReady: boolean;
};

export const FullViewReflectionListFetcher: React.FC<
  FullViewReflectionListFetcherProps
> = ({ reflections, username, userImage, isReady }) => {
  // TODO: Next.jsのバージョンを15に上げ、PPRを実装する際に消す
  if (!isReady) {
    return <Loading />;
  }

  return (
    <FullViewReflectionPaperListArea
      reflections={reflections}
      username={username}
      userImage={userImage}
    />
  );
};
