import Image from "next/image";
import { Button } from "@mui/material";

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
      sx={{
        color: "black",
        letterSpacing: 0.5
      }}
    >
      <Image
        src={"/edit.svg"}
        alt={"編集するボタン"}
        width={18}
        height={18}
        style={{ marginRight: 10 }}
      />
      編集する
    </Button>
  );
};

export default ToEditPageButton;