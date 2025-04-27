import { useMediaQuery } from "@mui/material";
import { theme } from "@/src/app/_client/utils/theme";

type UseResponsive = {
  isMobile: boolean;
  isPWA: boolean;
};

export const useResponsive = (): UseResponsive => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isPWA = useMediaQuery("(display-mode: standalone)");

  return {
    isMobile,
    isPWA
  };
};
