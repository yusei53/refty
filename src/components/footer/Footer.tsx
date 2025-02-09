"use client";
import { useMediaQuery } from "@mui/material";
import { DefaultFooter } from "./default";
import { MobileFooter } from "./mobile";

export const Footer = () => {
  const isPWA = useMediaQuery("(display-mode: standalone)");

  return isPWA ? <MobileFooter /> : <DefaultFooter />;
};
