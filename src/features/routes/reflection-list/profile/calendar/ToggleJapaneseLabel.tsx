import { Box, Typography } from "@mui/material";
import { IOSSwitch } from "@/src/components/switch";

type ToggleJapaneseLabelProps = {
  onToggleLabel: () => void;
};

const ToggleJapaneseLabel: React.FC<ToggleJapaneseLabelProps> = ({
  onToggleLabel
}) => {
  return (
    <Box display={"flex"} alignItems={"center"} mx={{ xs: 1, md: 0.5 }}>
      <Typography fontSize={11} mr={0.8}>
        日本語表示
      </Typography>
      <IOSSwitch onClick={onToggleLabel} />
    </Box>
  );
};

export default ToggleJapaneseLabel;
