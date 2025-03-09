"use client";
import { useMemo } from "react";
import { Box, keyframes } from "@mui/material";

export const StarAnimation: React.FC = () => {
  const twinkle = keyframes`
    0% { opacity: 0.2; }
    50% { opacity: 1; }
    100% { opacity: 0.2; }
  `;
  const stars = useMemo(() => {
    const starCount = 80;
    return Array.from({ length: starCount }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const delay = Math.random() * 5;
      return (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            bgcolor: "white",
            borderRadius: "50%",
            animation: `${twinkle} 5s infinite ease-in-out`,
            animationDelay: `${delay}s`
          }}
        />
      );
    });
  }, [twinkle]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={0}
      sx={{
        background: "linear-gradient(to bottom, #0A2342, #1C3F59)",
        overflow: "hidden"
      }}
    >
      {stars}
    </Box>
  );
};
