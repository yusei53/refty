import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AppealCard from "./AppealCard";
import { appeals } from "./appeal";

const ThirdView = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      my={{ xs: 8, md: 10 }}
    >
      <Typography
        component={"h2"}
        fontWeight={"bold"}
        letterSpacing={1}
        fontSize={{ xs: 22, md: 38 }}
      >
        継続して振り返りができる工夫
      </Typography>
      <Typography
        textAlign={"center"}
        letterSpacing={{ xs: 0.5, md: 0.8 }}
        my={3}
        lineHeight={1.8}
        fontSize={{ md: 18 }}
      >
        リフティでは、継続して振り返りが出来るように様々な機能を用意しています。
      </Typography>
      <Grid container my={0.5} spacing={4} width={{ md: "75vw" }}>
        {appeals.map((appeal) => (
          <Grid
            key={appeal.image}
            size={{ xs: 12, sm: 6, md: 4 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            px={{ md: 1 }}
            my={{ xs: 0.5, md: 2 }}
          >
            <AppealCard
              image={appeal.image}
              title={appeal.title}
              description={appeal.description}
              isComingSoon={appeal.isComingSoon}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ThirdView;
