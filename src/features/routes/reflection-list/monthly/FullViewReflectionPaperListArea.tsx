import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography, Grid, Chip } from "@mui/material";
import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { FullViewReflectionPaper } from "./FullViewReflectionPaper";
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

export const FullViewMonthlyReflectionList: React.FC<
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
      <Box display="flex" justifyContent="flex-end" gap={1} mb={2} mt={-1}>
        <Chip
          label="新しい順"
          onClick={toggleSortOrder}
          sx={{
            backgroundColor: !isAscending
              ? theme.palette.primary.main
              : "transparent",
            "&:hover": {
              backgroundColor: !isAscending
                ? theme.palette.primary.main
                : theme.palette.grey[100]
            },
            "& .MuiTouchRipple-root": {
              display: "none"
            },
            "&.MuiChip-clickable": {
              "&:active": {
                boxShadow: "none"
              }
            }
          }}
        />
        <Chip
          label="古い順"
          onClick={toggleSortOrder}
          sx={{
            backgroundColor: isAscending
              ? theme.palette.primary.main
              : "transparent",
            "&:hover": {
              backgroundColor: isAscending
                ? theme.palette.primary.main
                : theme.palette.grey[100]
            },
            "& .MuiTouchRipple-root": {
              display: "none"
            },
            "&.MuiChip-clickable": {
              "&:active": {
                boxShadow: "none"
              }
            }
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
                  <FullViewReflectionPaper
                    reflection={reflection}
                    username={username}
                    userImage={userImage}
                  />
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
