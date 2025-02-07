import Image from "next/image";
import { Box, Typography } from "@mui/material";

const FirstView: React.FC = () => {
  return (
    <Box textAlign={"center"}>
      <Image
        src="/favicon.svg"
        alt={"feature image"}
        width={140}
        height={140}
        priority
      />
      <Typography fontSize={19} fontWeight={"bold"}>
        リフティ / refty.jp
      </Typography>
      <Typography fontSize={16} my={2}>
        ~ 日々の振り返りを手助けする振り返りプラットフォーム ~
      </Typography>
    </Box>
  );
};

export default FirstView;
