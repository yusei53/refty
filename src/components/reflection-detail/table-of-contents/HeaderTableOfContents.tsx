import React, { useState } from "react";
import Link from "next/link";
import { Box, Button, Fade, Popper } from "@mui/material";
import { theme } from "@/src/utils/theme";

type HeaderTableOfContentsProps = {
  tocArray: { href: string; title: string }[];
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
          display: { xs: "block", md: "none" },
          width: "90px",
          border: "none",
          alignItems: "center",
          whiteSpace: "nowrap",
          color: theme.palette.grey[600]
        }}
      >
        目次
      </Button>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box boxShadow={1} borderRadius={2} bgcolor={"white"}>
              {tocArray.map((content) => (
                <Box
                  key={content.href}
                  display={"flex"}
                  flexDirection={"column"}
                  px={2}
                  py={0.75}
                >
                  <Link
                    href={content.href}
                    onClick={(e) => {
                      e.preventDefault();
                      // MEMO: ヘッダーを含めた時にロジックまで飛ばすロジック
                      const targetElement = document.querySelector(
                        content.href
                      );
                      if (targetElement) {
                        const headerOffset = 55;
                        const elementPosition =
                          targetElement.getBoundingClientRect().top;
                        const offsetPosition =
                          elementPosition + window.scrollY - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth"
                        });
                      }
                    }}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.grey[600]
                    }}
                  >
                    {content.title}
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