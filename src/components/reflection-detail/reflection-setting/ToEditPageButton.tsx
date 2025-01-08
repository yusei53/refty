import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";

type ToEditPageButtonProps = {
  username: string;
  reflectionCUID: string;
};

const ToEditPageButton: React.FC<ToEditPageButtonProps> = ({
  username,
  reflectionCUID
}) => {
  return (
    <Button
      href={`/${username}/${reflectionCUID}/edit`}
      disableRipple
      sx={{
        color: "black",
        border: "1px solid",
        borderColor: "#DCDFE3",
        borderRadius: 10,
        display: "flex"
      }}
    >
      <Box alignItems={"center"} display={"flex"} p={0.5}>
        <Image
          src={"/edit.svg"}
          alt={"編集するボタン"}
          width={16}
          height={16}
          style={{ marginRight: 3 }}
        />
        <Typography fontSize={13.5}>編集する</Typography>
      </Box>
    </Button>
  );
};

export default ToEditPageButton;
