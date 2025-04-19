import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography
} from "@mui/material";
import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";

type Props = {
  reflections: ReflectionWithIncludeContent[];
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

export const MonthlyReflectionList = ({ reflections }: Props) => {
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
              {reflections.map((reflection) => (
                <Box key={reflection.reflectionCUID} sx={{ mb: 2 }}>
                  <Typography variant="h6">{reflection.title}</Typography>
                  <Typography>{reflection.content}</Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </div>
  );
};
