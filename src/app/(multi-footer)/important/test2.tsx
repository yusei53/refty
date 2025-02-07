import Image from "next/image";
import Link from "next/link";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { theme } from "@/src/utils/theme";

type EffectSectionProps = {
  image: string;
  title: string;
  description: string;
  isEvenNumber?: boolean;
  isShareSection?: boolean;
};

const EffectSection: React.FC<EffectSectionProps> = ({
  image,
  title,
  description,
  isEvenNumber = false,
  isShareSection = false
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      my={{ xs: 6, md: 4 }}
      mx={15}
    >
      <Typography
        component={"h3"}
        fontSize={"1.3rem"}
        fontWeight={"bold"}
        letterSpacing={{ xs: 1, md: 0.8 }}
        whiteSpace={"pre-line"}
        m={{ xs: "0 auto", md: 0 }}
      >
        {title}
      </Typography>
      <Typography
        letterSpacing={"0.03em"}
        fontSize={17}
        lineHeight={"2rem"}
        whiteSpace={"pre-line"}
      >
        {description}
      </Typography>
      <Box m={{ xs: "0 auto", md: 0 }}>
        <Image
          src={image}
          alt={"feature image"}
          width={370}
          height={370}
          priority
          style={{ margin: "15px 0px" }}
        />
      </Box>
    </Box>
  );
};

export default EffectSection;
