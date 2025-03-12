import { useMediaQuery } from "@mui/material";
import { theme } from "@/src/utils/theme";

export const useIsMobile = (): boolean => {
  return useMediaQuery(theme.breakpoints.down("sm"));
};
