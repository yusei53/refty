import { Box, Typography } from "@mui/material";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";

type SelectedAITypeButtonProps = {
  icon: string;
  detail: string;
};

export const SelectedAITypeButton: React.FC<SelectedAITypeButtonProps> = ({
  icon,

  detail
}) => {
  const { isMobile } = useResponsive();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={1}
      fontSize={isMobile ? 12 : 14}
    >
      <Typography fontSize={20}>{icon}</Typography>
      {detail}
    </Box>
  );
};
