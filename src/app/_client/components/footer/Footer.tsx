"use client";
import { DefaultFooter } from "./default";
import { MobileFooter } from "./mobile";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";

export const Footer = () => {
  const { isPWA } = useResponsive();

  return isPWA ? <MobileFooter /> : <DefaultFooter />;
};
