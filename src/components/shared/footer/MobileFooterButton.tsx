import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { theme } from "@/src/utils/theme";

type MobileFooterButtonProps = {
  href: string;
  imagePass: string;
  alt: string;
  title: string;
};

export const MobileFooterButton: React.FC<MobileFooterButtonProps> = ({
  href,
  imagePass,
  alt,
  title,
}) => {
  return (
    <Box textAlign={"center"} lineHeight={0.8}>
      <Link href={href} style={{ textDecoration: "none" }}>
        <Image
          src={`/mobile-footer/${imagePass}`}
          alt={alt}
          width={24}
          height={24}
        />
        <Typography
          color={`${theme.palette.grey[600]}`}
          fontWeight={550}
          fontSize={13.5}
        >
          {title}
        </Typography>
      </Link>
    </Box>
  );
};
