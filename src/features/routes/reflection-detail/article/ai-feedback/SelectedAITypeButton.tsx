import { Box, Typography, useMediaQuery } from "@mui/material";
import { theme } from "@/src/utils/theme";

type SelectedAITypeButtonProps = {
  icon: string;
  detail: string;
};

export const SelectedAITypeButton: React.FC<SelectedAITypeButtonProps> = ({
  icon,

  detail
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        fontSize={isSmallScreen ? 12 : 14}
      >
        <Typography fontSize={20}>{icon}</Typography>
        {detail}
      </Box>
    </>
  );
};
