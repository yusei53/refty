import Image from "next/image";
import { Button } from "@/src/app/_client/components/button";

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
        display: "flex",
        alignItems: "center"
      }}
    >
      <Image
        src={"/edit.svg"}
        alt={"編集するボタン"}
        width={17}
        height={17}
        style={{ marginRight: 3 }}
      />
      編集する
    </Button>
  );
};

export default ToEditPageButton;
