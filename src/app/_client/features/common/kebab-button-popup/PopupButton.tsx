import Image from "next/image";
import { Button, Box } from "@mui/material";
import { theme } from "@/src/app/_client/utils/theme";

type PopupButtonProps = {
  text: string;
  href?: string;
  src: string;
  alt: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  textcolor?: string;
};

export const PopupButton: React.FC<PopupButtonProps> = ({
  text,
  href,
  src,
  alt,
  onClick,
  textcolor = "black"
}) => {
  return (
    <Button
      disableRipple
      onClick={onClick}
      href={href}
      sx={{
        color: textcolor,
        border: "none",
        display: "block",
        textAlign: "left",
        borderRadius: "none",
        width: "100%",
        px: 2,
        "&:hover": {
          backgroundColor: theme.palette.primary.contrastText
        }
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
