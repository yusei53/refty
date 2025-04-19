import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography, Grid, Paper } from "@mui/material";
import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { ReflectionArticle } from "../../reflection-detail/article";
import { Accordion } from "@/src/components/accordion";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type Props = {
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

  return Object.entries(groups)
    .map(([month, items]) => ({
      month,
      reflections: items
    }))
    .sort((a, b) => b.month.localeCompare(a.month));
};

export const MonthlyReflectionList = ({
  reflections,
  username,
  userImage
}: Props) => {
  const groupedReflections = groupReflectionsByMonth(reflections);
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>(
    {}
  );

  const toggleMonth = (month: string) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  return (
    <Box mx={3}>
      {groupedReflections.map(({ month, reflections }) => {
        const isExpanded = expandedMonths[month];
        const displayReflections = isExpanded
          ? reflections
          : reflections.slice(0, 3);
        const hasMore = reflections.length > 3;

        return (
          <Box key={month} mb={4}>
            <Typography fontSize={20} mb={2}>
              {format(new Date(month), "yyyy年M月", { locale: ja })}
              {` / ${reflections.length}件`}
            </Typography>
            <Grid container spacing={3}>
              {displayReflections.map((reflection) => (
                <Grid key={reflection.reflectionCUID} size={{ xs: 12, md: 4 }}>
                  <Link
                    href={`/${username}/${reflection.reflectionCUID}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Paper
                      elevation={0.1}
                      sx={{
                        maxHeight: "380px",
                        height: "100%",
                        overflow: "hidden",
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.grey[300]}`
                      }}
                    >
                      <Box
                        width={"145%"}
                        height={"100%"}
                        mt={-7}
                        ml={-7}
                        sx={{
                          transform: "scale(0.58)",
                          transition: "transform 0.3s ease-in-out",
                          transformOrigin: "center center"
                        }}
                      >
                        <ReflectionArticle
                          username={username}
                          userImage={userImage}
                          createdAt={reflection.createdAt}
                          title={reflection.title}
                          content={reflection.content}
                          activeTags={[]}
                          reflectionCUID={reflection.reflectionCUID}
                        />
                      </Box>
                    </Paper>
                  </Link>
                </Grid>
              ))}
              {hasMore && (
                <Grid size={12}>
                  <Accordion
                    expanded={isExpanded}
                    onChange={() => toggleMonth(month)}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: -1
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
