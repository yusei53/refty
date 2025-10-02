import { useMemo } from "react";
import type { ReflectionsCount } from "../../api/reflections-count-api";
import { getOneYearAgo } from "@/src/app/_shared/date-helper/date-helpers";

type UseReflectionHeatmapProps = {
  targetYear: number | null;
  reflectionCount: ReflectionsCount;
};

export const useReflectionHeatmap = ({
  targetYear,
  reflectionCount
}: UseReflectionHeatmapProps) => {
  const startDateCalc = (targetYear: number | null): Date => {
    if (targetYear !== null) {
      return new Date(targetYear, 0, 1);
    }
    return getOneYearAgo();
  };

  const endDateCalc = (targetYear: number | null): Date => {
    if (targetYear !== null) {
      return new Date(targetYear, 11, 31);
    }
    return new Date();
  };

  const startDate = startDateCalc(targetYear);
  const endDate = endDateCalc(targetYear);

  // MEMO: 年ごとの投稿数を計算する
  const totalReflections = useMemo(() => {
    if (targetYear !== null) {
      return String(
        reflectionCount.reflectionsPerDate
          .filter((reflection) =>
            reflection.date.startsWith(targetYear.toString())
          )
          .reduce((acc, reflection) => acc + reflection.countReflections, 0)
      );
    }
    return String(reflectionCount.totalReflections);
  }, [targetYear, reflectionCount]);

  const oldestYear = useMemo(() => {
    return reflectionCount.reflectionsPerDate.reduce((acc, reflection) => {
      return Math.min(acc, Number(reflection.date.split("-")[0]));
    }, Infinity);
  }, [reflectionCount]);

  const newestYear = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  // MEMO: 投稿がある一番古い年からの配列
  const reflectionYears = useMemo(() => {
    const years = [];
    for (let i = oldestYear; i <= newestYear; i++) {
      years.push(i);
    }
    return years;
  }, [oldestYear, newestYear]);

  return { startDate, endDate, totalReflections, reflectionYears };
};
