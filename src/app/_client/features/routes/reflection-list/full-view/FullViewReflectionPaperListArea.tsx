import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography, Grid, Chip } from "@mui/material";
import type { ReflectionWithIncludeContent } from "@/src/app/_client/api/reflection-api";
import { FullViewReflectionPaper } from "./FullViewReflectionPaper";
import { Accordion } from "@/src/app/_client/components/accordion";
import { Button } from "@/src/app/_client/components/button";
import { useFullViewReflection } from "@/src/app/_client/hooks/full-view/useFullViewReflection";
import { theme } from "@/src/app/_client/utils/theme";

type FullViewReflectionPaperListAreaProps = {
  reflections: ReflectionWithIncludeContent[];
  username: string;
  userImage: string;
};

const DEFAULT_DISPLAY_REFLECTION = 3;

export const FullViewReflectionPaperListArea: React.FC<
  FullViewReflectionPaperListAreaProps
> = ({ reflections, username, userImage }) => {
  const {
    expandedMonths,
    isAscending,
    toggleExpansion,
    toggleSortOrder,
    sortedReflections
  } = useFullViewReflection(reflections);

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
          : reflections.slice(0, DEFAULT_DISPLAY_REFLECTION);
        const hasMore = reflections.length > DEFAULT_DISPLAY_REFLECTION;

        return (
          <Box key={month} mb={hasMore ? 4 : 12}>
            <Typography fontSize={20} mb={2} pl={0.5}>
              {month}
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
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: -1,
                      bgcolor: "transparent"
                    }}
                  >
                    <Button
                      disableRipple
                      onClick={() => toggleExpansion(month)}
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
