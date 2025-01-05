import Image from "next/image";
import { Button, Box } from "@mui/material";

type ReflectionSettingButtonProps = {
  username: string;
  reflectionCUID: string;
};

const ReflectionSettingButton: React.FC<ReflectionSettingButtonProps> = ({
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

export default ReflectionSettingButton;
