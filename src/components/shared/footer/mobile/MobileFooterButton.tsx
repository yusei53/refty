import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

type MobileFooterButtonProps = {
  href: string;
  imagePass: string;
  alt: string;
  isAvatar?: boolean;
};

export const MobileFooterButton: React.FC<MobileFooterButtonProps> = ({
  href,
  imagePass,
  alt,
  isAvatar = false,
}) => {
  return (
    <Box textAlign={"center"} lineHeight={0.8}>
      <Link href={href} style={{ textDecoration: "none" }}>
        <Image
          src={isAvatar ? `${imagePass}` : `/mobile-footer/${imagePass}`}
          alt={alt}
          width={30}
          height={30}
          style={{ borderRadius: 15 }}
        />
      </Link>
    </Box>
  );
};
