import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { theme } from "@/src/utils/theme";

type ResponsiveState = {
  isMobile: boolean;
  isPWA: boolean;
}

export const useResponsive = (): ResponsiveState => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkPWA = () => {
      // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

      // ref: https://developer.mozilla.org/en-US/docs/Web/API/Navigator
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isPWA = isStandalone || (window.navigator as any).standalone;
      setIsPWA(isPWA);
    };

    checkPWA();
    window.matchMedia("(display-mode: standalone)").addEventListener("change", checkPWA);

    return () => {
      window.matchMedia("(display-mode: standalone)").removeEventListener("change", checkPWA);
    };
  }, []);

  return {
    isMobile,
    isPWA,
  };
};