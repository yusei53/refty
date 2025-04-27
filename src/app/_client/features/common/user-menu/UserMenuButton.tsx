import Image from "next/image";
import { Button, Box, Typography } from "@mui/material";
import { theme } from "@/src/app/_client/utils/theme";

type UserMenuButtonProps = {
  title: string;
  href: string;
  src: string;
  alt: string;
};

export const UserMenuButton: React.FC<UserMenuButtonProps> = ({
  title,
  href,
  src,
  alt
}) => {
  return (
    <Button
      disableRipple
      href={href}
      sx={{
        color: "black",
        display: "block",
        borderRadius: "none",
        py: 1,
        pr: 1.2,
        mx: 1.2,
        "&:hover": {
          backgroundColor: theme.palette.primary.contrastText
        }
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Image
          src={src}
          alt={alt}
          width={18}
          height={18}
          style={{ marginRight: 8 }}
        />
        <Typography component={"span"} fontSize={14} letterSpacing={0.5}>
          {title}
        </Typography>
      </Box>
    </Button>
  );
};
