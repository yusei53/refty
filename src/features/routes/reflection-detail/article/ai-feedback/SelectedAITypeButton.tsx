import Image from "next/image";
import { Box } from "@mui/material";

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
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Image src={icon} alt={alt} width={25} height={25} />
        {detail}
      </Box>
    </>
  );
};
