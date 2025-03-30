import { Grid } from "@mui/material";
import type { Reflection } from "@/src/api/reflection-api";
import { ReflectionCard } from "./ReflectionCard";
import { animation } from "@/src/features/common/animation";

type ReflectionCardListAreaProps = {
  username: string;
  reflections: Reflection[];
  isCurrentUser: boolean;
  isSelectMode: boolean;
  isSelected?: boolean | ((reflectionCUID: string) => boolean);
  onSelect?: (reflectionCUID: string) => void;
};

const ReflectionCardListArea: React.FC<ReflectionCardListAreaProps> = ({
  username,
  reflections,
  isCurrentUser,
  isSelectMode,
  isSelected,
  onSelect
}) => {
  return (
    <Grid container sx={{ position: "relative" }}>
      {reflections.map((reflection, index) => {
        const selected =
          typeof isSelected === "function"
            ? isSelected(reflection.reflectionCUID)
            : (isSelected ?? false);

        return (
          <Grid
            key={reflection.reflectionCUID}
            size={{ xs: 12, md: 6 }}
            display={"flex"}
            justifyContent={"center"}
            mb={3.5}
            sx={animation(index)}
          >
            <ReflectionCard
              username={username}
              reflection={reflection}
              isCurrentUser={isCurrentUser}
              isSelectMode={isSelectMode}
              isSelected={selected}
              onSelect={onSelect}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ReflectionCardListArea;
