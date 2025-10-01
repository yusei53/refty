import { getOneYearAgo } from "@/src/app/_shared/date-helper/date-helpers";

export const useReflectionHeatmap = (targetYear: number | null) => {
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
  return { startDate, endDate };
};
