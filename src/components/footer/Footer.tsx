"use client";
import { useMediaQuery } from "@mui/material";
import { DefaultFooter } from "./default";
import { MobileFooter } from "./mobile";
import { theme } from "@/src/utils/theme";

export const Footer = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return isSmallScreen ? <MobileFooter /> : <DefaultFooter />;
};
