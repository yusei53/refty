import Image from "next/image";
import { Box, Typography } from "@mui/material";

type EffectSectionProps = {
  image: string;
  title: string;
  description: string;
};

const EffectSection: React.FC<EffectSectionProps> = ({
  image,
  title,
  description
}) => {
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
          width={220}
          height={220}
          priority
          style={{ margin: "15px 0px" }}
        />
      </Box>
    </Box>
  );
};

export default EffectSection;
