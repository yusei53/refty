import { getOneYearAgo } from "@/src/utils/date-helper/date-helpers";
import { getColor } from "@/src/utils/calendar/get-color";
import { Tooltip } from "react-tooltip";
import { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import {
  ReflectionPerDate,
  ReflectionsCount,
} from "@/src/api/reflections-count-api";
import CalendarArea from "./CalendarArea";
import { useCallback } from "react";

type CalendarAreaFetcherProps = {
  reflectionCount: ReflectionsCount;
};

export const CalendarAreaFetcher: React.FC<CalendarAreaFetcherProps> = ({
  reflectionCount,
}) => {
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
        "data-tooltip-content": `${reflectionValue.date} の投稿数: ${reflectionValue.countReflections}`,
      };
    },
    []
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
      />
      <Tooltip id="tooltip-data-attrs" />
    </>
  );
};
