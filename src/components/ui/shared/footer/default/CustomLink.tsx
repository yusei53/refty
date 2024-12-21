import { styled } from "@mui/material";
import Link from "next/link";
import { theme } from "@/src/utils/theme";

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
};

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: theme.palette.grey[600],
  fontSize: 15,
  letterSpacing: 0.8,
  position: "relative",
  display: "inline-block",
  "&:hover::after": {
    transform: "scaleX(1)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: -2,
    height: 1.5,
    width: "100%",
    backgroundColor: theme.palette.grey[500],
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease-in-out",
  },
}));

export const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  return <StyledLink href={href}>{children}</StyledLink>;
};
