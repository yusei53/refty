import { IOSSwitch } from "@/src/components/ui/shared/switch";
import { theme } from "@/src/utils/theme";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";

type ToggleJapaneseLabelProps = {
  onToggleLabel: () => void;
};

const ToggleJapaneseLabel: React.FC<ToggleJapaneseLabelProps> = ({
  onToggleLabel,
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      mx={{ xs: 1, md: 0.5 }}
      // MEMO: md以下時にmb適用
      mb={isSmallScreen ? 1 : undefined}
    >
      <Typography fontSize={11} mr={0.8}>
        日本語表示
      </Typography>
      <IOSSwitch onClick={onToggleLabel} />
    </Box>
  );
};

export default ToggleJapaneseLabel;
