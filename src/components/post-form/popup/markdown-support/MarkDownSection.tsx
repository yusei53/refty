import { theme } from "@/src/utils/theme";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";

export type MarkdownSectionType = {
  image: string;
  title: string;
  description: string;
};

const MarkDownSection: React.FC<MarkdownSectionType> = ({
  image,
  title,
  description,
}) => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} p={1}>
        <Box
          bgcolor={`${theme.palette.primary.main}`}
          borderRadius={2}
          minWidth={40}
          minHeight={40}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image
            src={`/markdown/${image}`}
            alt={`${title}のアイコン`}
            width={30}
            height={30}
          />
        </Box>
        <Box whiteSpace={"nowrap"} mx={1.5}>
          <Typography fontSize={13.5}>{title}</Typography>
          <Typography fontSize={11} color={`${theme.palette.grey[600]}`}>
            {description}
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{ borderColor: theme.palette.grey[100], minWidth: "480px" }}
      />
    </>
  );
};

export default MarkDownSection;
