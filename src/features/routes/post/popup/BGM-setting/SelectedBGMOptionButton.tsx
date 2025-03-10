import React from "react";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Typography } from "@mui/material";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type SelectedBGMOptionButtonProps = {
  currentTrack: string;
  onClick: () => void;
  icon: string;
  text: string;
  description: string;
};

const SelectedBGMOptionButton: React.FC<SelectedBGMOptionButtonProps> = ({
  currentTrack,
  onClick,
  icon,
  text,
  description
}) => {
  const japaneseToEnglish = (text: string) => {
    switch (text) {
      case "自然BGM":
        return "bird";
      case "アンビエントBGM":
        return "rain";
      case "BGM停止":
        return "stop";
      default:
        return text;
    }
  };

  return (
    <Button
      onClick={onClick}
      sx={{
        border: "none",
        display: "block",
        textAlign: "left",
        width: "100%",
        borderRadius: "none",
        "&:hover": { backgroundColor: theme.palette.primary.contrastText }
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Image
          src={icon}
          alt={`${text} Icon`}
          width={18}
          height={18}
          style={{ marginRight: 4 }}
        />
        {text}
        {currentTrack == japaneseToEnglish(text) && (
          <CheckIcon fontSize="small" sx={{ ml: 1 }} />
        )}
      </Box>
      <Typography fontSize={12} color={theme.palette.grey[600]}>
        {description}
      </Typography>
    </Button>
  );
};

export default SelectedBGMOptionButton;
