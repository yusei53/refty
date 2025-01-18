"use client";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import { EffectCards, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, useMediaQuery } from "@mui/material";
import type { ReflectionBook } from "@/src/api/reflections-book-api";
import { ReflectionArticle } from "@/src/features/routes/reflection-detail/article";
import { EmptyReflection } from "@/src/features/routes/reflection-list/card-list/empty-reflection";
import { SwipeIconDisplay } from "@/src/features/routes/reflections-book/SwipeIconDisplay";
import "@/src/features/routes/reflections-book/my-swiper.css";
import { useParseTagsToValue } from "@/src/hooks/reflection-tag/useParseTagsToValue";
import { useSwipeIconVisibility } from "@/src/hooks/reflections-book/useSwipeIconVisibility";
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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isVisible = useSwipeIconVisibility();
  const { parseTagsToValue } = useParseTagsToValue();

  return reflections.length === 0 ? (
    <Box
      height={"90vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <EmptyReflection />
    </Box>
  ) : (
    <Box
      position={"relative"}
      sx={{ overflowX: { xs: "hidden", md: "visible" } }}
    >
      {isVisible && <SwipeIconDisplay isVisible={isVisible} />}
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards, Navigation]}
        cardsEffect={{
          slideShadows: false,
          perSlideRotate: isSmallScreen ? 0 : 2,
          perSlideOffset: isSmallScreen ? 0 : 8
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
