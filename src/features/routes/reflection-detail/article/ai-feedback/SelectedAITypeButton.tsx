import Image from "next/image";
import { Box, useMediaQuery } from "@mui/material";
import { theme } from "@/src/utils/theme";

type SelectedAITypeButtonProps = {
  icon: string;
  alt: string;
  detail: string;
};

export const SelectedAITypeButton: React.FC<SelectedAITypeButtonProps> = ({
  icon,
  alt,
  detail
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        fontSize={isSmallScreen ? 12 : 15}
      >
        <Image src={icon} alt={alt} width={25} height={25} />
        {detail}
      </Box>
    </>
  );
};
