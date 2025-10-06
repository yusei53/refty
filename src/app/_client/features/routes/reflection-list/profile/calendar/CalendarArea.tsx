import { memo, useEffect, useRef, useState } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import type { ReflectionPerDate } from "@/src/app/_client/api/reflections-count-api";
import type { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./calendar.css";
import Calendar from "./Calendar";
import ToggleJapaneseLabel from "./ToggleJapaneseLabel";
import { Button } from "@/src/app/_client/components/button";
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
  targetYear: number | null;
  reflectionYears: number[];
  onClick: (value: ReactCalendarHeatmapValue<string> | undefined) => void;
  onYearClick: (year: number) => void;
};

const CalendarArea: React.FC<CalendarAreaProps> = ({
  startDate,
  endDate,
  values,
  classForValue,
  tooltipDataAttrs,
  totalReflections,
  targetYear,
  reflectionYears,
  onClick,
  onYearClick
}) => {
  const { isMobile } = useResponsive();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(targetYear);

  // MEMO: targetYearが変更されたらselectedYearも同期する
  // TODO: React v19にしたらuseOptimisticで代替する
  useEffect(() => {
    setSelectedYear(targetYear);
  }, [targetYear]);

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
    <Box display={"flex"} flexDirection={"row"}>
      <Box mt={5} mb={3} mx={3} sx={{ flex: 1, minWidth: 0 }}>
        {isMobile && <ToggleJapaneseLabel onToggleLabel={handleToggleLabels} />}
        <Box
          display={"flex"}
          justifyContent={{ sm: "space-between" }}
          alignItems={"center"}
          mb={0.5}
        >
          <Typography mx={1} fontSize={15}>
            {isJapanese
              ? `${targetYear ? `${targetYear}年に` : "直近1年間で"} ${totalReflections} 回振り返りをしています`
              : `${totalReflections} reflections in ${targetYear || "the last year"}`}
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
        {isMobile && (
          <Box mt={2} display={"flex"} justifyContent={"flex-end"}>
            <Select
              value={selectedYear || ""}
              onChange={(e) => {
                const year = Number(e.target.value);
                setSelectedYear(year);
                onYearClick(year);
              }}
              displayEmpty
              size="small"
              sx={{
                backgroundColor: theme.palette.grey[100],
                color: theme.palette.grey[600],
                borderRadius: 1.5,
                minWidth: 120,
                fontSize: 14,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.grey[400]
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.grey[500]
                }
              }}
            >
              <MenuItem value="" disabled>
                Year
              </MenuItem>
              {[...reflectionYears].reverse().map((year) => (
                <MenuItem key={year} value={year}>
                  {year}年
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
      </Box>
      {!isMobile && (
        <Box display={"flex"} flexDirection={"column"} mt={5} gap={2}>
          {[...reflectionYears].reverse().map((year) => (
            <Button
              key={year}
              onClick={() => onYearClick(year)}
              sx={{
                backgroundColor:
                  targetYear === year ? theme.palette.grey[200] : "white",
                color: theme.palette.grey[600],
                border: "none",
                borderRadius: 1.5,
                "&:hover": {
                  backgroundColor: theme.palette.grey[100]
                }
              }}
            >
              {year}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default memo(CalendarArea);
