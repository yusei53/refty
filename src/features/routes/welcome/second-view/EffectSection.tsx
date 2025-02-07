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
  isSmartphone?: boolean;
};

const EffectSection: React.FC<EffectSectionProps> = ({
  image,
  title,
  description,
  isEvenNumber = false,
  isShareSection = false,
  isSmartphone = false
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display={"flex"}
      flexDirection={{
        xs: "column",
        md: isEvenNumber ? "row-reverse" : "row"
      }}
      gap={5}
      my={{ xs: 6, md: 12 }}
      mx={{ xs: 0, md: 20 }}
    >
      {!isSmallScreen && (
        <Box
          bgcolor={"#f3f4f5"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"90vw"}
          height={325}
        >
          <Image
            src={image}
            alt={"feature image"}
            width={500}
            height={350}
            priority
            style={{
              borderRadius: 5,
              boxShadow: "0 5px 5px 0 rgba(47, 47, 47, 0.1)",
              maxHeight: "90%",
              width: "90%",
              height: "auto"
            }}
          />
        </Box>
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
          <Box
            my={2.5}
            bgcolor={"#f3f4f5"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"90vw"}
            height={200}
          >
            <Image
              src={image}
              alt={"feature image"}
              width={170}
              height={170}
              priority
              style={{
                borderRadius: 5,
                boxShadow: "0 5px 5px 0 rgba(47, 47, 47, 0.1)",
                maxHeight: "90%",
                width: "90%",
                height: "auto"
              }}
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
