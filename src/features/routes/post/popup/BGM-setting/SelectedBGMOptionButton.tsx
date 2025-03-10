import React from "react";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Typography } from "@mui/material";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type SelectedBGMOptionButtonProps = {
  currentTrack: string;
  BGMName: string;
  onClick: () => void;
  icon: string;
  text: string;
  description: string;
};

const SelectedBGMOptionButton: React.FC<SelectedBGMOptionButtonProps> = ({
  currentTrack,
  BGMName,
  onClick,
  icon,
  text,
  description
}) => {
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
        {currentTrack == BGMName && (
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
