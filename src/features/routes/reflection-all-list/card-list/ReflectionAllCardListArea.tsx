import Grid from "@mui/material/Grid2";
import type { ReflectionWithUser } from "@/src/api/reflection-api";
import type { User } from "@prisma/client";
import ReflectionCardWithUser from "./ReflectionCardWithUser";
import { animation } from "@/src/features/common/animation";

type ReflectionAllCardListAreaProps = {
  currentUsername: User["username"];
  reflections: ReflectionWithUser[];
};

const ReflectionAllCardListArea: React.FC<ReflectionAllCardListAreaProps> = ({
  currentUsername,
  reflections
}) => {
  return (
    <Grid container my={0.5}>
      {/* NOTE: indexはアニメーションのために必要 */}
      {reflections.map((reflection, index) => {
        const isCurrentUser = currentUsername === reflection.user.username;
        return (
          <Grid
            key={reflection.reflectionCUID}
            size={{ xs: 12, md: 6 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            mb={3.5}
            sx={animation(index)}
          >
            <ReflectionCardWithUser
              reflection={reflection}
              isCurrentUser={isCurrentUser}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ReflectionAllCardListArea;
