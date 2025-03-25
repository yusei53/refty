import React from "react";
import dynamic from "next/dynamic";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import { LinearLoading } from "@/src/components/loading";

const CalendarAreaFetcher = dynamic(
  () =>
    import(
      "@/src/features/routes/reflection-list/profile/calendar/CalendarAreaFetcher"
    ).then((mod) => mod.CalendarAreaFetcher),
  {
    loading: () => <LinearLoading />,
    ssr: false
  }
);

type ReflectionsCountAreaProps = {
  reflectionCount: ReflectionsCount;
};

export const ReflectionsCountArea: React.FC<ReflectionsCountAreaProps> = ({
  reflectionCount
}) => {
  return <CalendarAreaFetcher reflectionCount={reflectionCount} />;
};
