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
      flexDirection={{
        xs: "column",
        md: isEvenNumber ? "row-reverse" : "row"
      }}
      gap={4}
      my={{ xs: 6, md: 12 }}
    >
      {!isSmallScreen && (
        <Image
          src={image}
          alt={"feature image"}
          width={350}
          height={350}
          priority
        />
      )}
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={{ md: "center" }}
      >
        <Typography
          component={"h3"}
          fontSize={{ xs: 21, md: 28 }}
          fontWeight={"bold"}
          letterSpacing={{ xs: 1, md: 0.8 }}
          whiteSpace={"pre-line"}
          m={{ xs: "0 auto", md: 0 }}
          mb={{ md: 1.5 }}
        >
          {title}
        </Typography>
        {isSmallScreen && (
          <Box m={{ xs: "0 auto", md: 0 }}>
            <Image
              src={image}
              alt={"feature image"}
              width={170}
              height={170}
              priority
              style={{ margin: "15px 0px" }}
            />
          </Box>
        )}
        <Typography
          letterSpacing={0.5}
          fontSize={{ xs: 14, md: 15 }}
          whiteSpace={"pre-line"}
        >
          {description}
        </Typography>
        {isShareSection && (
          <Link
            href={"/"}
            style={{
              color: "black",
              marginTop: 15,
              fontSize: 14
            }}
          >
            みんなの振り返りはこちら
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default EffectSection;
