import { useState } from "react";
import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { formatDateToMonth } from "@/src/utils/date-helper/date-helpers";

const groupReflectionsByMonth = (
  reflections: ReflectionWithIncludeContent[]
): { month: string; reflections: ReflectionWithIncludeContent[] }[] => {
  const groups = reflections.reduce(
    (acc, reflection) => {
      const month = formatDateToMonth(reflection.createdAt);
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(reflection);
      return acc;
    },
    {} as Record<string, ReflectionWithIncludeContent[]>
  );

  return Object.entries(groups).map(([month, items]) => ({
    month,
    reflections: items
  }));
};

export const useFullViewReflection = (
  reflections: ReflectionWithIncludeContent[]
) => {
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>(
    {}
  );
  const [isAscending, setIsAscending] = useState(false);

  const toggleMonth = (month: string) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  const groupedReflections = groupReflectionsByMonth(reflections);
  const sortedReflections = [...groupedReflections].sort((a, b) => {
    const comparison = a.month.localeCompare(b.month);
    return isAscending ? comparison : -comparison;
  });

  return {
    expandedMonths,
    isAscending,
    toggleMonth,
    toggleSortOrder,
    sortedReflections
  };
};
