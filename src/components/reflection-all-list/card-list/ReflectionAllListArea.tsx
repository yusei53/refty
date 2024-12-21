import { ReflectionWithUser } from "@/src/api/reflection-api";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { User } from "@prisma/client";
import { ChangeEvent } from "react";
import { animation } from "../../ui/shared/animation";
import {
  ArrowPagination,
  NumberedPagination
} from "../../ui/shared/pagination";
import { ReflectionAllHeader } from "../header";
import ReflectionCardWithUser from "./ReflectionCardWithUser";

type ReflectionAllAreaProps = {
  currentUsername: User["username"];
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
  onChange: (event: ChangeEvent<unknown>, value: number) => void;
};

const ReflectionAllArea: React.FC<ReflectionAllAreaProps> = ({
  currentUsername,
  reflections,
  currentPage,
  totalPage,
  onChange
}) => {
  return (
    // MEMO: rootのpageにあたるこのコンポーネントはroute-groupで崩れてしまうのでContainerをここ設定
    // MEMO: 今まではlayout.tsxで当てていたし、お気持ちはここにおきたくはない
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Box mt={{ xs: 4, md: 12 }} position={"relative"} mb={{ xs: -1, sm: 0 }}>
        <ReflectionAllHeader currentUsername={currentUsername} />
        <ArrowPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={onChange}
        />
        <Grid container my={0.5}>
          {/* MEMO: indexはアニメーションのために必要 */}
          {reflections.map((reflection, index) => (
            <Grid
              key={reflection.reflectionCUID}
              size={{ xs: 12, md: 6 }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              mb={3.5}
              sx={animation(index)}
            >
              <ReflectionCardWithUser reflection={reflection} />
            </Grid>
          ))}
        </Grid>
        <NumberedPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={onChange}
        />
      </Box>
    </Container>
  );
};

export default ReflectionAllArea;
