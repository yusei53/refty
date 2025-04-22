import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography, Grid, Chip } from "@mui/material";
import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { ReflectionArticle } from "../../reflection-detail/article";
import { Accordion } from "@/src/components/accordion";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type FullViewReflectionPaperListAreaProps = {
  reflections: ReflectionWithIncludeContent[];
  username: string;
  userImage: string;
};

const groupReflectionsByMonth = (
  reflections: ReflectionWithIncludeContent[]
) => {
  const groups = reflections.reduce(
    (acc, reflection) => {
      const month = format(new Date(reflection.createdAt), "yyyy-MM");
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(reflection);
      return acc;
    },
    {} as Record<string, ReflectionWithIncludeContent[]>
  );

  return Object.entries(groups).map(([month, items]) => ({
    month,
    reflections: items
  }));
};

export const FullViewMonthlyReflectionListArea: React.FC<
  FullViewReflectionPaperListAreaProps
> = ({ reflections, username, userImage }) => {
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>(
    {}
  );
  const [isAscending, setIsAscending] = useState(false);

  const toggleMonth = (month: string) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  const groupedReflections = groupReflectionsByMonth(reflections);
  const sortedReflections = [...groupedReflections].sort((a, b) => {
    const comparison = a.month.localeCompare(b.month);
    return isAscending ? comparison : -comparison;
  });

  return (
    <Box mx={3}>
      <Box display={"flex"} justifyContent={"flex-end"} gap={1} mb={2} mt={-1}>
        <Chip
          label="新しい順"
          onClick={toggleSortOrder}
          sx={{
            ...chip,
            ...getChipBackgroundColor(!isAscending)
          }}
        />
        <Chip
          label="古い順"
          onClick={toggleSortOrder}
          sx={{
            ...chip,
            ...getChipBackgroundColor(isAscending)
          }}
        />
      </Box>
      {sortedReflections.map(({ month, reflections }) => {
        const isExpanded = expandedMonths[month];
        const displayReflections = isExpanded
          ? reflections
          : reflections.slice(0, 3);
        const hasMore = reflections.length > 3;

        return (
          <Box key={month} mb={hasMore ? 4 : 12}>
            <Typography fontSize={20} mb={2} pl={0.5}>
              {format(new Date(month), "yyyy年M月", { locale: ja })}
              {` / ${reflections.length}件`}
            </Typography>
            <Grid container spacing={3}>
              {displayReflections.map((reflection) => (
                <Grid key={reflection.reflectionCUID} size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      height: "380px",
                      overflow: "hidden",
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.grey[300]}`,
                      transition: "transform 0.3s ease-in-out",
                      position: "relative",
                      paddingRight: "4px",
                      "&:hover": {
                        paddingRight: "0px",
                        transform: "scale(1.2)",
                        boxShadow: `0 6px 24px 0 ${theme.palette.grey[400]}`,
                        zIndex: 1,
                        overflow: "auto",
                        overflowX: "hidden",
                        "&::-webkit-scrollbar": {
                          width: "4px"
                        },
                        "&::-webkit-scrollbar-track": {
                          background: theme.palette.grey[100],
                          borderRadius: "2px"
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: theme.palette.grey[300],
                          borderRadius: "2px",
                          "&:hover": {
                            background: theme.palette.grey[400]
                          }
                        }
                      }
                    }}
                  >
                    <Link
                      href={`/${username}/${reflection.reflectionCUID}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1
                      }}
                    />
                    <Box
                      mt={-7}
                      height={"100%"}
                      minWidth={"150%"}
                      sx={{
                        transform: "scale(0.55)"
                      }}
                    >
                      <ReflectionArticle
                        username={username}
                        userImage={userImage}
                        createdAt={reflection.createdAt}
                        title={reflection.title}
                        content={reflection.content}
                        activeTags={[]} //TODO: API置き換える時に追加
                        reflectionCUID={reflection.reflectionCUID}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
              {hasMore && (
                <Grid size={12}>
                  <Accordion
                    expanded={isExpanded}
                    onChange={() => toggleMonth(month)}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: -1,
                      bgcolor: "transparent"
                    }}
                  >
                    <Button
                      disableRipple
                      onClick={() => toggleMonth(month)}
                      sx={{
                        color: theme.palette.grey[600],
                        border: "none",
                        letterSpacing: 0.8
                      }}
                    >
                      {isExpanded ? "閉じる" : "もっと見る"}
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Button>
                  </Accordion>
                </Grid>
              )}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

const chip = {
  "& .MuiTouchRipple-root": {
    display: "none"
  },
  "&.MuiChip-clickable": {
    "&:active": {
      boxShadow: "none"
    }
  }
};

const getChipBackgroundColor = (isActive: boolean) => ({
  backgroundColor: isActive ? theme.palette.primary.main : "transparent",
  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.grey[100]
  }
});
