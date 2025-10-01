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
import { useReflectionHeatmap } from "@/src/app/_client/hooks/calendar/useReflectionHeatmap";
type CalendarAreaFetcherProps = {
  reflectionCount: ReflectionsCount;
};

export const CalendarAreaFetcher: React.FC<CalendarAreaFetcherProps> = ({
  reflectionCount
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const yearParam = searchParams?.get("year") ?? null;
  const parsedYear = yearParam ? Number.parseInt(yearParam, 10) : NaN;
  const targetYear = Number.isNaN(parsedYear) ? null : parsedYear;

  const { startDate, endDate, totalReflections } = useReflectionHeatmap({
    targetYear,
    reflectionCount
  });

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

  const handleYearClick = useCallback(
    (year: number) => {
      if (!searchParams) {
        return;
      }
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("year", String(year));
      router.push(`${pathname}?${current.toString()}`);
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
        totalReflections={totalReflections}
        targetYear={targetYear}
        onClick={handleCalendarClick}
        onYearClick={handleYearClick}
      />
      <Tooltip id="tooltip-data-attrs" />
    </>
  );
};
