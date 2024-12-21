import { memo, useEffect, useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import type { ReflectionPerDate } from "@/src/api/reflections-count-api";
import type { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import Calendar from "./Calendar";
import "./calendar.css";
import ToggleJapaneseLabel from "./ToggleJapaneseLabel";
import { useToggleJapaneseLabels } from "@/src/hooks/calendar/useToggleJapaneseLabels";
import { theme } from "@/src/utils/theme";

type CalendarAreaProps = {
  startDate: Date;
  endDate: Date;
  values: ReflectionPerDate[];
  classForValue: (
    value: ReactCalendarHeatmapValue<string> | undefined
  ) => string;
  tooltipDataAttrs: (
    value: ReactCalendarHeatmapValue<string> | undefined
  ) => Record<string, string>;
  totalReflections: string;
};

const CalendarArea: React.FC<CalendarAreaProps> = ({
  startDate,
  endDate,
  values,
  classForValue,
  tooltipDataAttrs,
  totalReflections,
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // MEMO: 画面幅が小さい場合、カレンダーのスクロールを右端に移動する。useEffectでエラー回避
  useEffect(() => {
    if (isSmallScreen && scrollContainerRef.current) {
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft =
            scrollContainerRef.current.scrollWidth;
        }
      });
    }
  }, [isSmallScreen]);

  const { calendarRef, isJapanese, handleToggleLabels } =
    useToggleJapaneseLabels();

  return (
    <Box mt={5} mb={3} mx={3}>
      {isSmallScreen && (
        <ToggleJapaneseLabel onToggleLabel={handleToggleLabels} />
      )}
      <Box
        display={"flex"}
        justifyContent={{ md: "space-between" }}
        alignItems={"center"}
        mb={0.5}
      >
        <Typography mx={1} fontSize={15}>
          {isJapanese
            ? `直近1年間で ${totalReflections} 回振り返りをしています`
            : `${totalReflections} reflections in the last year`}
        </Typography>
        {!isSmallScreen && (
          <ToggleJapaneseLabel onToggleLabel={handleToggleLabels} />
        )}
      </Box>
      <Box
        ref={calendarRef}
        border={`1px solid ${theme.palette.grey[400]}`}
        borderRadius={2}
        p={"12px 16px 8px 4px"}
      >
        {/* MEMO: 900px以下でスクロール可能にするにするためのBoxコンポーネント */}
        <Box
          ref={scrollContainerRef}
          sx={{
            overflowX: isSmallScreen ? "auto" : "visible",
          }}
        >
          <Box minWidth={isSmallScreen ? "780px" : "100%"}>
            <Calendar
              startDate={startDate}
              endDate={endDate}
              values={values}
              classForValue={classForValue}
              tooltipDataAttrs={tooltipDataAttrs}
              showWeekdayLabels
              gutterSize={2}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(CalendarArea);
