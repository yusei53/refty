"use client";
import { theme } from "@/src/utils/theme";
import { useMediaQuery } from "@mui/material";
import { DefaultFooter } from "./default";
import { MobileFooter } from "./mobile";

export const Footer = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return isSmallScreen ? <MobileFooter /> : <DefaultFooter />;
};
