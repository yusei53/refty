import { memo, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import type { ReflectionPerDate } from "@/src/app/_client/api/reflections-count-api";
import type { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./calendar.css";
import Calendar from "./Calendar";
import ToggleJapaneseLabel from "./ToggleJapaneseLabel";
import { useToggleJapaneseLabels } from "@/src/app/_client/hooks/calendar/useToggleJapaneseLabels";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";
import { theme } from "@/src/app/_client/utils/theme";

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
  onClick: (value: ReactCalendarHeatmapValue<string> | undefined) => void;
};

const CalendarArea: React.FC<CalendarAreaProps> = ({
  startDate,
  endDate,
  values,
  classForValue,
  tooltipDataAttrs,
  totalReflections,
  onClick
}) => {
  const { isMobile } = useResponsive();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // MEMO: 画面幅が小さい場合、カレンダーのスクロールを右端に移動する。useEffectでエラー回避
  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft =
            scrollContainerRef.current.scrollWidth;
        }
      });
    }
  }, [isMobile]);

  const { calendarRef, isJapanese, handleToggleLabels } =
    useToggleJapaneseLabels();

  return (
    <Box mt={5} mb={3} mx={3}>
      {isMobile && <ToggleJapaneseLabel onToggleLabel={handleToggleLabels} />}
      <Box
        display={"flex"}
        justifyContent={{ sm: "space-between" }}
        alignItems={"center"}
        mb={0.5}
      >
        <Typography mx={1} fontSize={15}>
          {isJapanese
            ? `直近1年間で ${totalReflections} 回振り返りをしています`
            : `${totalReflections} reflections in the last year`}
        </Typography>
        {!isMobile && (
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
            overflowX: isMobile ? "auto" : "visible"
          }}
        >
          <Box minWidth={isMobile ? "780px" : "100%"}>
            <Calendar
              startDate={startDate}
              endDate={endDate}
              values={values}
              classForValue={(value) => {
                const baseClass = classForValue(value);
                return `${baseClass} ${value ? "clickable" : ""}`;
              }}
              tooltipDataAttrs={tooltipDataAttrs}
              showWeekdayLabels
              gutterSize={2}
              onClick={onClick}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(CalendarArea);
