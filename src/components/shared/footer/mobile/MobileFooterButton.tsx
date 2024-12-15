import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { theme } from "@/src/utils/theme";

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
  const pathname = usePathname();
  const isActive = pathname === href;
  const defaultImagePass = `/mobile-footer/${imagePass}`;
  const activeImagePass = `/mobile-footer/active-${imagePass}`;

  // NOTE: アバターなら/mobile~ではなく、通常パス。そうじゃないならactivePageの場合とそうじゃない場合でパスを出し分ける
  const displayedImage = isAvatar
    ? imagePass
    : isActive
    ? activeImagePass
    : defaultImagePass;

  return (
    <Box textAlign={"center"} lineHeight={0.8}>
      <Link href={href} style={{ textDecoration: "none" }}>
        <Image
          src={displayedImage}
          alt={alt}
          width={30}
          height={30}
          style={{
            borderRadius: 15,
            border:
              isAvatar && isActive
                ? `1px solid ${theme.palette.grey[600]}`
                : undefined,
          }}
        />
      </Link>
    </Box>
  );
};
