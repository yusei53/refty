import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export type ViewMode = "card" | "detail";

export const useViewMode = (initialViewMode: ViewMode = "card") => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlViewMode = searchParams.get("viewMode") as ViewMode;
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>(
    urlViewMode || initialViewMode
  );

  const handleViewModeChange = (
    _: React.SyntheticEvent,
    newValue: ViewMode
  ) => {
    setCurrentViewMode(newValue);
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (newValue === "card") {
      newSearchParams.delete("viewMode");
    } else {
      newSearchParams.set("viewMode", newValue);
    }

    router.push(`?${newSearchParams.toString()}`);
  };

  return { currentViewMode, handleViewModeChange };
};
