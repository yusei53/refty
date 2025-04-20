import { useState } from "react";
import { useSearchParams } from "next/navigation";

export type ViewMode = "card" | "detail";

type UseViewModeProps = {
  initialViewMode?: ViewMode;
};

export const useViewMode = ({
  initialViewMode = "card"
}: UseViewModeProps = {}) => {
  const searchParams = useSearchParams();
  const urlViewMode = searchParams.get("viewMode") as ViewMode | null;

  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>(
    urlViewMode || initialViewMode
  );

  const handleViewModeChange = (
    _: React.SyntheticEvent,
    newValue: ViewMode
  ) => {
    setCurrentViewMode(newValue);
  };

  return {
    currentViewMode,
    handleViewModeChange
  };
};
