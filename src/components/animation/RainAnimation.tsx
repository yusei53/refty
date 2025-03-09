// FIXME:  use clientはつけたくないのであとで消す作業
"use client";
import { useMemo } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

export const RainAnimation = () => {
  const rains = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: 1 + Math.random() * 5,
        height: 8 + Math.random() * 20
      })),
    []
  );

  return (
    <Box position={"fixed"} top={0} left={0} width={"100%"} height={"100%"}>
      {rains.map((rain, index) => (
        <Box
          key={index}
          position={"absolute"}
          left={rain.left}
          width={"1px"}
          height={rain.height}
          bgcolor={"rgba(220, 220, 220, 0.6)"}
          sx={{
            animation: `${fallAnimation} ${rain.duration}s linear infinite`,
            animationDelay: rain.delay
          }}
        />
      ))}
    </Box>
  );
};

// NOTE: 上から下に落ちるアニメーション
const fallAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(110vh);
    opacity: 0;
  }
`;
