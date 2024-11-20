import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { theme } from "@/src/utils/theme";

type TProps = {
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
  fadeOut?: boolean;
};

const ReflectionTemplateInstruct: React.FC<TProps> = ({
  title,
  description,
  position,
  fadeOut = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (fadeOut) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [fadeOut]);

  const pointerStyles = {
    top: {
      "&::after": {
        content: '""',
        position: "absolute",
        top: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "0 10px 10px 10px",
        borderColor: `transparent transparent ${theme.palette.grey[400]} transparent`,
      },
    },
    bottom: {
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "10px 10px 0 10px",
        borderColor: `${theme.palette.grey[400]} transparent transparent transparent`,
      },
    },
    left: {
      "&::after": {
        content: '""',
        position: "absolute",
        left: "-10px",
        top: "50%",
        transform: "translateY(-50%)",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "10px 10px 10px 0",
        borderColor: `transparent ${theme.palette.grey[400]} transparent transparent`,
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
    <Box display="flex" paddingInline={2}>
      <Box
        position={"relative"}
        bgcolor={theme.palette.grey[400]}
        borderRadius={"8px"}
        padding={"16px"}
        maxWidth={"300px"}
        sx={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
          ...pointerStyles[position],
        }}
      >
        <Typography fontWeight={"bold"}>{title}</Typography>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  );
};

export default ReflectionTemplateInstruct;
