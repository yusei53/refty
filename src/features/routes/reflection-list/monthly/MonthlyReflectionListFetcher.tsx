import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { MonthlyReflectionList } from "./MonthlyReflectionList";
import { LinearLoading } from "@/src/components/loading";

type MonthlyReflectionListFetcherProps = {
  reflections: ReflectionWithIncludeContent[];
  isReady: boolean;
};

export const MonthlyReflectionListFetcher = ({
  reflections,
  isReady
}: MonthlyReflectionListFetcherProps) => {
  // TODO: Next.jsのバージョンを15に上げ、PPRを実装する際に消す
  if (!isReady) {
    return <LinearLoading />;
  }

  return <MonthlyReflectionList reflections={reflections} />;
};
