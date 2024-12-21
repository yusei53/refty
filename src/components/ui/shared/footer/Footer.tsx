"use client";
import { theme } from "@/src/utils/theme";
import { useMediaQuery } from "@mui/material";
import { MobileFooter } from "./mobile";
import { DefaultFooter } from "./default";

export const Footer = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return isSmallScreen ? <MobileFooter /> : <DefaultFooter />;
};
