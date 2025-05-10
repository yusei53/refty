import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tooltip } from "react-tooltip";
import type {
  ReflectionPerDate,
  ReflectionsCount
} from "@/src/app/_client/api/reflections-count-api";
import type { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import CalendarArea from "./CalendarArea";
import { getColor } from "./get-color";
import { getOneYearAgo } from "@/src/app/_shared/date-helper/date-helpers";

type CalendarAreaFetcherProps = {
  reflectionCount: ReflectionsCount;
};

export const CalendarAreaFetcher: React.FC<CalendarAreaFetcherProps> = ({
  reflectionCount
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startDate = getOneYearAgo();
  const endDate = new Date();

  const classForValue = useCallback(
    (value: ReactCalendarHeatmapValue<string> | undefined): string => {
      const reflectionValue = value as ReflectionPerDate | undefined;
      if (!reflectionValue || !reflectionValue.countReflections) {
        return "color-empty";
      }
      return getColor(reflectionValue.countReflections);
    },
    []
  );

  const tooltipDataAttrs = useCallback(
    (
      value: ReactCalendarHeatmapValue<string> | undefined
    ): Record<string, string> => {
      const reflectionValue = value as ReflectionPerDate | undefined;
      if (!reflectionValue || !reflectionValue.date) {
        return {};
      }
      return {
        "data-tooltip-id": "tooltip-data-attrs",
        "data-tooltip-content": `${reflectionValue.date} の投稿数: ${reflectionValue.countReflections}`
      };
    },
    []
  );

  const handleCalendarClick = useCallback(
    (value: ReactCalendarHeatmapValue<string> | undefined) => {
      const reflectionValue = value as ReflectionPerDate | undefined;
      if (reflectionValue && reflectionValue.date) {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("reflectionDate", reflectionValue.date);
        router.push(`${pathname}?${current.toString()}`);
      }
    },
    [router, pathname, searchParams]
  );

  return (
    <>
      <CalendarArea
        startDate={startDate}
        endDate={endDate}
        values={reflectionCount.reflectionsPerDate}
        classForValue={classForValue}
        tooltipDataAttrs={tooltipDataAttrs}
        totalReflections={reflectionCount.totalReflections}
        onClick={handleCalendarClick}
      />
      <Tooltip id="tooltip-data-attrs" />
    </>
  );
};
