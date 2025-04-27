import { useRef, useState } from "react";

const monthMapJP = {
  Jan: "1月",
  Feb: "2月",
  Mar: "3月",
  Apr: "4月",
  May: "5月",
  Jun: "6月",
  Jul: "7月",
  Aug: "8月",
  Sep: "9月",
  Oct: "10月",
  Nov: "11月",
  Dec: "12月"
};

const weekdayMapJP = {
  Mon: "月",
  Wed: "水",
  Fri: "金"
};

export const useToggleJapaneseLabels = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isJapanese, setIsJapanese] = useState(false);

  const handleToggleLabels = () => {
    const monthLabels = calendarRef.current?.querySelectorAll(
      ".react-calendar-heatmap-month-label"
    );
    const weekdayLabels = calendarRef.current?.querySelectorAll(
      ".react-calendar-heatmap-weekday-label"
    );

    // 月ラベルの切り替え
    monthLabels?.forEach((label) => {
      const textContent = label.textContent;

      if (isJapanese) {
        label.textContent =
          Object.keys(monthMapJP).find(
            (key) => monthMapJP[key as keyof typeof monthMapJP] === textContent
          ) || textContent;
      } else if (
        textContent &&
        monthMapJP[textContent as keyof typeof monthMapJP]
      ) {
        label.textContent = monthMapJP[textContent as keyof typeof monthMapJP];
      }
    });

    // 曜日ラベルの切り替え
    weekdayLabels?.forEach((label) => {
      const textContent = label.textContent;

      if (isJapanese) {
        label.textContent =
          Object.keys(weekdayMapJP).find(
            (key) =>
              weekdayMapJP[key as keyof typeof weekdayMapJP] === textContent
          ) || textContent;
      } else if (
        textContent &&
        weekdayMapJP[textContent as keyof typeof weekdayMapJP]
      ) {
        label.textContent =
          weekdayMapJP[textContent as keyof typeof weekdayMapJP];
      }
    });

    setIsJapanese(!isJapanese);
  };

  return { calendarRef, isJapanese, handleToggleLabels };
};
