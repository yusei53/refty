import { Box, Typography } from "@mui/material";
import { theme } from "../../../utils/theme";

type SectionProps = {
  title: string;
  description: string;
};

const Section: React.FC<SectionProps> = ({ title, description }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      margin={"0 auto"}
      my={8}
    >
      <Typography
        component={"h2"}
        fontSize={{ xs: "1.2rem", md: "1.3rem" }}
        fontWeight={550}
        letterSpacing={{ xs: 1, md: 0.8 }}
        whiteSpace={"pre-line"}
        lineHeight={1.8}
        borderBottom={`1px solid ${theme.palette.grey[400]}`}
      >
        {title}
      </Typography>
      <Typography
        letterSpacing={"0.03em"}
        fontSize={{ xs: 15, md: 16 }}
        lineHeight={"2rem"}
        whiteSpace={"pre-line"}
        sx={{
          "& ol": {
            marginBlock: 0,
            paddingLeft: 2
          },
          "& li": {
            marginBottom: "0"
          }
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Box>
  );
};

export default Section;
