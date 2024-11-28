import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { theme } from "@/src/utils/theme";

type ReflectionTemplateInstructProps = {
  title: string;
  description: string;
  fadeOut?: boolean;
};

export const ReflectionTemplateInstruct: React.FC<
  ReflectionTemplateInstructProps
> = ({ title, description, fadeOut = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pointerPosition: "top" | "right" = isMobile ? "top" : "right";

  if (fadeOut && isVisible) {
    setTimeout(() => setIsVisible(false), 1000);
  }

  const pointerStyles: Record<"top" | "right", any> = {
    top: {
      "&::after": {
        content: '""',
        position: "absolute",
        top: "-10px",
        left: "25%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "0 10px 10px 10px",
        borderColor: `transparent transparent ${theme.palette.grey[400]} transparent`,
      },
    },
    right: {
      "&::after": {
        content: '""',
        position: "absolute",
        right: "-10px",
        top: "50%",
        transform: "translateY(-50%)",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "10px 0 10px 10px",
        borderColor: `transparent transparent transparent ${theme.palette.grey[400]}`,
      },
    },
  };

  return (
    <Box display={"flex"} px={2}>
      <Box
        position={"relative"}
        bgcolor={theme.palette.grey[400]}
        borderRadius={4}
        padding={2}
        maxWidth={{ xs: 200, md: 500 }}
        sx={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
          ...pointerStyles[pointerPosition],
        }}
      >
        <Typography fontWeight={"bold"}>{title}</Typography>
        <Typography
          whiteSpace={"pre-wrap"}
          sx={{
            wordBreak: "break-word",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReflectionTemplateInstruct;
