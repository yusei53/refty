import Image from "next/image";
import Link from "next/link";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";
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
  const isMobile = useIsMobile();
  const isLarge = useMediaQuery(theme.breakpoints.up("xl"));

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
        {!isMobile && (
          <Box
            bgcolor="#f3f4f5"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flex={{ xs: 1, xl: undefined }}
            height={{ xs: 330, xl: 450 }}
          >
            {/* // TODO: 画像のサイズが統一されていないから中途半端な数値を当てた書き方になっている。揃えたい */}
            <Image
              src={image}
              alt="feature image"
              width={600}
              height={380}
              priority
              sizes="100vw"
              style={{
                borderRadius: 5,
                boxShadow: "0 5px 5px 0 rgba(47, 47, 47, 0.1)",
                maxHeight: isLarge ? "100%" : "90%",
                width: "95%",
                height: "auto"
              }}
            />
          </Box>
        )}
        {isSmartphonePicture && !isMobile && (
          <Image
            src="/lp/welcome-4-sp.png"
            alt="sp image"
            width={120}
            height={200}
            sizes="100vw"
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
          {isMobile && (
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
                sizes="100vw"
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
          {isSmartphonePicture && isMobile && (
            <Image
              src="/lp/welcome-4-sp.png"
              alt="mp image"
              width={80}
              height={200}
              sizes="100vw"
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
