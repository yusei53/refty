import Grid from "@mui/material/Grid2";
import type { Reflection } from "@/src/api/reflection-api";
import ReflectionCard from "./ReflectionCard";
import { animation } from "@/src/features/common/animation";

type ReflectionCardListAreaProps = {
  username: string;
  reflections: Reflection[];
  isCurrentUser: boolean;
};

const ReflectionCardListArea: React.FC<ReflectionCardListAreaProps> = ({
  username,
  reflections,
  isCurrentUser
}) => {
  return (
    <>
      <Grid container sx={{ position: "relative" }}>
        {reflections.map((reflection, index) => (
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
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ReflectionCardListArea;
