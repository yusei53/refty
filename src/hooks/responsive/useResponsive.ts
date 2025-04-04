import { useMediaQuery } from "@mui/material";
import { theme } from "@/src/utils/theme";

type ResponsiveState = {
  isMobile: boolean;
  isPWA: boolean;
}

export const useResponsive = (): ResponsiveState => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isPWA = useMediaQuery("(display-mode: standalone)");

  return {
    isMobile,
    isPWA,
  };
};