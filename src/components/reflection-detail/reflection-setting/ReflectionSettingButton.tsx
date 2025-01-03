import Image from "next/image";
import { Button, Box } from "@mui/material";

type ReflectionSettingButtonProps = {
  text: string;
  href?: string;
  src: string;
  alt: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  textcolor?: string;
};

const ReflectionSettingButton: React.FC<ReflectionSettingButtonProps> = ({
  text,
  href,
  src,
  alt,
  onClick,
  textcolor = "black"
}) => {
  return (
    <Button
      onClick={onClick}
      href={href}
      sx={{
        color: textcolor
      }}
    >
      <Box display={"flex"} alignItems={"center"} letterSpacing={0.5}>
        <Image
          src={src}
          alt={alt}
          width={18}
          height={18}
          style={{ marginRight: 10 }}
        />
        {text}
      </Box>
    </Button>
  );
};

export default ReflectionSettingButton;
