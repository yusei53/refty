import React from "react";
import SwipeIcon from "@mui/icons-material/Swipe";
import { Box } from "@mui/material";
import { theme } from "@/src/utils/theme";

type SwipeIconProps = {
  isVisible: boolean;
};

export const SwipeIconDisplay: React.FC<SwipeIconProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <Box
      position={"absolute"}
      top={0}
      right={{ xs: 25, md: 75 }}
      zIndex={10}
      color={theme.palette.grey[500]}
      sx={{
        animation: "fadeInOut 4s forwards",
        "@keyframes fadeInOut": {
          "0%": {
            opacity: 0
          },
          "20%": {
            opacity: 1
          },
          "80%": {
            opacity: 1
          },
          "100%": {
            opacity: 0
          }
        }
      }}
    >
      <SwipeIcon sx={{ fontSize: { xs: 55, sm: 70 } }} />
    </Box>
  );
};
