import { Box, Typography } from "@mui/material";
import useIsMobile from "@/src/hooks/responsive/useIsMobile";

type SelectedAITypeButtonProps = {
  icon: string;
  detail: string;
};

export const SelectedAITypeButton: React.FC<SelectedAITypeButtonProps> = ({
  icon,

  detail
}) => {
  const isMobile = useIsMobile();
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        fontSize={isMobile ? 12 : 14}
      >
        <Typography fontSize={20}>{icon}</Typography>
        {detail}
      </Box>
    </>
  );
};
