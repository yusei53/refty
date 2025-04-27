declare module "react-calendar-heatmap" {
  interface ReactCalendarHeatmapValue<T extends ReactCalendarHeatmapDate> {
    date: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  export interface ReactCalendarHeatmapProps {
    startDate: Date | string;
    endDate: Date | string;
    values: ReflectionPerDate[];
    classForValue: (value: ReactCalendarHeatmapValue<T> | undefined) => string;
    tooltipDataAttrs: (
      value: ReactCalendarHeatmapValue<T> | undefined
    ) => Record<string, string>;
    showWeekdayLabels?: boolean;
    gutterSize: number;
    horizontal?: boolean;
  }

  export default class CalendarHeatmap extends React.Component<ReactCalendarHeatmapProps> {
    getHeight(): number;
    getWeekWidth(): number;
    getMonthLabelSize(): number;
    getTransformForWeekdayLabels(): string | null;
  }
}
