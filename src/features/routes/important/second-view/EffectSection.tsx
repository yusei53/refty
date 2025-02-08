import Image from "next/image";
import { Box, Typography } from "@mui/material";

type EffectSectionProps = {
  image: string;
  title: string;
  description: string;
  isRightPicture?: boolean;
  isCenterPicture?: boolean;
};

const EffectSection: React.FC<EffectSectionProps> = ({
  image,
  title,
  description,
  isRightPicture = false,
  isCenterPicture = false
}) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      my={{ xs: 6, md: 8 }}
      mx={10}
      maxWidth={{ xs: "90vw", md: "75vw" }}
      margin={"0 auto"}
    >
      <Typography
        component={"h2"}
        fontSize={{ xs: 21, md: 28 }}
        fontWeight={"bold"}
        letterSpacing={{ xs: 1, md: 0.8 }}
        whiteSpace={"pre-line"}
        m={{ xs: "0 auto", md: 0 }}
        lineHeight={1.8}
      >
        {title}
      </Typography>
      <Typography
        letterSpacing={"0.03em"}
        fontSize={{ xs: 15, md: 17 }}
        lineHeight={"2rem"}
        whiteSpace={"pre-line"}
      >
        {description}
      </Typography>
      {isRightPicture && (
        <Box
          m={{ xs: "0 auto", md: 0 }}
          display={"flex"}
          justifyContent={"right"}
        >
          <Image
            src={image}
            alt={"feature image"}
            width={250}
            height={250}
            priority
            style={{ margin: "15px 0px" }}
          />
        </Box>
      )}
      {isCenterPicture && (
        <Box m={{ xs: "0 auto", md: "0 auto" }}>
          <Image
            src={image}
            alt={"feature image"}
            width={250}
            height={250}
            priority
            style={{ margin: "15px 0px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default EffectSection;
