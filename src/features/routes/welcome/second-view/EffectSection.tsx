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
  isSmartphonePicture?: boolean;
};

const EffectSection: React.FC<EffectSectionProps> = ({
  image,
  title,
  description,
  isEvenNumber = false,
  isShareSection = false,
  isSmartphonePicture = false
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: { xs: "90vw", md: "75vw" },
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)"
      }}
    >
      <Box
        display="flex"
        flexDirection={{
          xs: "column",
          md: isEvenNumber ? "row-reverse" : "row"
        }}
        gap={5}
        my={{ xs: 6, md: 12 }}
      >
        {!isSmallScreen && (
          <Box
            bgcolor="#f3f4f5"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flex={1}
            height={335}
          >
            <Image
              src={image}
              alt="feature image"
              width={600}
              height={380}
              priority
              style={{
                borderRadius: 5,
                boxShadow: "0 5px 5px 0 rgba(47, 47, 47, 0.1)",
                maxHeight: "90%",
                width: "95%",
                height: "auto"
              }}
            />
          </Box>
        )}
        {isSmartphonePicture && !isSmallScreen && (
          <Image
            src="/lp/welcome-4-sp.png"
            alt="sp image"
            width={120}
            height={200}
            style={{
              position: "absolute",
              right: -10,
              bottom: 0,
              height: "auto"
            }}
          />
        )}
        <Box display="flex" flexDirection="column" flex={1}>
          <Typography
            component="h3"
            fontSize={{ xs: 21, md: 28 }}
            fontWeight="bold"
            letterSpacing={{ xs: 1, md: 0.8 }}
            whiteSpace="pre-line"
            m={{ xs: "0 auto", md: 0 }}
            mb={{ md: 1.5 }}
            mt={{ md: 1.5 }}
          >
            {title}
          </Typography>
          {isSmallScreen && (
            <Box
              my={2.5}
              bgcolor="#f3f4f5"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="90vw"
              height={200}
            >
              <Image
                src={image}
                alt="feature image"
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
          {isSmartphonePicture && isSmallScreen && (
            <Image
              src="/lp/welcome-4-sp.png"
              alt="mp image"
              width={80}
              height={200}
              style={{
                position: "absolute",
                right: 10,
                marginTop: 88,
                height: "auto"
              }}
            />
          )}
          <Typography
            letterSpacing={0.5}
            fontSize={{ xs: 14, md: 15 }}
            whiteSpace="pre-line"
            mt={{ md: 1 }}
          >
            {description}
          </Typography>
          {isShareSection && (
            <Link
              href="/important"
              style={{
                color: "black",
                marginTop: 15,
                fontSize: 14
              }}
            >
              なぜ振り返りをするのか？
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EffectSection;
