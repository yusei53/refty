import { useState } from "react";
import Link from "next/link";
import { Box, Fade, Popper } from "@mui/material";
import { Button } from "@/src/app/_client/components/button";
import { theme } from "@/src/app/_client/utils/theme";

type HeaderTableOfContentsProps = {
  tocArray: { href: string; title: string }[];
};

const scrollToHeading = (heading: { href: string; title: string }) => {
  const targetElement = document.querySelector(heading.href);
  if (targetElement) {
    const headerOffset = 55;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset - 50;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

const HeaderTableOfContents: React.FC<HeaderTableOfContentsProps> = ({
  tocArray
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        onClick={handleClick}
        onBlur={handleClose}
        sx={{
          border: "none",
          color: theme.palette.grey[600],
          mr: -2
        }}
      >
        目次
      </Button>
      {/* TODO: disablePortal の動作を確認する */}
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 2 }}
        placement={"bottom-start"}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              boxShadow={1}
              borderRadius={2}
              bgcolor={"white"}
              minWidth={200}
              maxWidth={300}
              py={1.2}
              maxHeight={"50vh"}
              sx={{
                overflowY: "auto"
              }}
            >
              {tocArray.map((heading) => (
                <Box
                  key={heading.href}
                  display={"flex"}
                  flexDirection={"column"}
                  px={2.2}
                  py={0.75}
                >
                  <Link
                    href={heading.href}
                    onClick={(e) => {
                      e.preventDefault();
                      // MEMO: ヘッダー分だけスクロールをずらすロジック;
                      scrollToHeading(heading);
                    }}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.grey[600]
                    }}
                  >
                    {heading.title}
                  </Link>
                </Box>
              ))}
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default HeaderTableOfContents;
