import OriginalCalendarHeatmap from "react-calendar-heatmap";

/*
 * デフォルトのカレンダーは要素自体が無駄に縦長で設定され、svgで調整もできないため、以下のようにカスタマイズする
 * 参考URL: https://github.com/kevinsqi/react-calendar-heatmap/issues/146
 */

class Calendar extends OriginalCalendarHeatmap {
  getHeight() {
    return (
      this.getWeekWidth() + (this.getMonthLabelSize() - this.props.gutterSize)
    );
  }

  getTransformForWeekdayLabels() {
    const WEEKDAY_LABEL_LEFT = 5;
    if (this.props.horizontal) {
      return `translate(${WEEKDAY_LABEL_LEFT}, ${this.getMonthLabelSize()})`;
    }
    return null;
  }
}

export default Calendar;
