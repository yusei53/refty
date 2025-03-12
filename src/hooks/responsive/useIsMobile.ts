import { useMediaQuery } from "@mui/material";
import { theme } from "@/src/utils/theme";

const useIsMobile = (): boolean => {
  return useMediaQuery(theme.breakpoints.down("sm"));
};

export default useIsMobile;
