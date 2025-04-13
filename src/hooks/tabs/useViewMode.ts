import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type ViewMode = "card" | "detail";

export const useViewMode = () => {
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>("card");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleViewModeChange = (
    _: React.SyntheticEvent,
    newValue: ViewMode
  ) => {
    const params = new URLSearchParams(searchParams);
    if (newValue === "card") {
      params.delete("viewMode");
    } else {
      params.set("viewMode", newValue);
    }

    router.push(`${pathname}?${params.toString()}`);
    setCurrentViewMode(newValue);
  };

  return { currentViewMode, handleViewModeChange };
};
