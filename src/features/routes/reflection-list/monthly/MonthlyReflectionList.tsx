import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Grid,
  Paper
} from "@mui/material";
import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { ReflectionArticle } from "../../reflection-detail/article";
import { Accordion } from "@/src/components/accordion";
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

  return (
    <div>
      <h1>内容表示</h1>
      <Box>
        {groupedReflections.map(({ month, reflections }) => (
          <Accordion key={month}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {format(new Date(month), "yyyy年M月", { locale: ja })}（
                {reflections.length}件）
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {reflections.map((reflection) => (
                  <Grid
                    key={reflection.reflectionCUID}
                    size={{ xs: 12, md: 4 }}
                  >
                    <Link
                      href={`/reflection/${reflection.reflectionCUID}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Paper
                        elevation={0.1}
                        sx={{
                          maxHeight: "380px",
                          height: "100%",
                          overflow: "hidden",
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.grey[300]}`,
                          "&:hover": {
                            boxShadow: 2
                          },
                          viewTransitionName: "note-card"
                        }}
                      >
                        <Box
                          width={"145%"}
                          height={"100%"}
                          mt={-7}
                          ml={-7}
                          sx={{
                            transform: "scale(0.6)"
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
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </div>
  );
};
