"use client";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "./styles.css";
import { useState, useEffect } from "react";
import { EffectCards, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeIcon from "@mui/icons-material/Swipe";
import { Box, useMediaQuery } from "@mui/material";
import type { ReflectionBook } from "@/src/api/reflections-book-api";
import { ReflectionArticle } from "@/src/features/routes/reflection-detail/article";
import { useParseTagsToValue } from "@/src/hooks/reflection-tag/useParseTagsToValue";
import { theme } from "@/src/utils/theme";

type ReflectionsBookPageProps = {
  reflections: ReflectionBook[];
  username: string;
  userImage: string;
};

const ReflectionsBookPage: React.FC<ReflectionsBookPageProps> = ({
  reflections,
  username,
  userImage
}) => {
  const { parseTagsToValue } = useParseTagsToValue();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showSwipeIcon, setShowSwipeIcon] = useState(true);

  useEffect(() => {
    setShowSwipeIcon(true);

    const timer = setTimeout(() => {
      setShowSwipeIcon(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box position={"relative"}>
      {showSwipeIcon && (
        <Box
          position={"absolute"}
          top={0}
          right={80}
          zIndex={10}
          color={theme.palette.grey[500]}
          sx={{
            animation: "fadeInOut 4s forwards",
            "@keyframes fadeInOut": {
              "0%": {
                opacity: 0
              },
              "20%": {
                opacity: 1
              },
              "80%": {
                opacity: 1
              },
              "100%": {
                opacity: 0
              }
            }
          }}
        >
          <SwipeIcon sx={{ fontSize: 55 }} />
        </Box>
      )}

      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards, Navigation]}
        cardsEffect={{
          slideShadows: false,
          perSlideRotate: isSmallScreen ? 0 : 2,
          perSlideOffset: isSmallScreen ? 3 : 8
        }}
        navigation
      >
        {reflections.map((reflection) => {
          const activeTags = [
            reflection.isDailyReflection &&
              parseTagsToValue("isDailyReflection"),
            reflection.isLearning && parseTagsToValue("isLearning"),
            reflection.isAwareness && parseTagsToValue("isAwareness"),
            reflection.isInputLog && parseTagsToValue("isInputLog"),
            reflection.isMonologue && parseTagsToValue("isMonologue")
          ].filter(Boolean) as string[];
          return (
            <SwiperSlide key={reflection.reflectionCUID}>
              <Box
                mt={{ xs: -8, md: -4 }}
                position={"relative"}
                width={"100%"}
                sx={{
                  transform: "scale(0.8)"
                }}
              >
                <ReflectionArticle
                  username={username}
                  userImage={userImage}
                  createdAt={reflection.createdAt}
                  title={reflection.title}
                  content={reflection.content}
                  activeTags={activeTags}
                  reflectionCUID={reflection.reflectionCUID}
                  isReflectionBook
                />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default ReflectionsBookPage;
