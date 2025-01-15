import { useState } from "react";
import Link from "next/link";
import { Box, Button, Fade, Popper } from "@mui/material";
import { KebabButtonPopupContainer } from "../../ui/shared/popup";
import ToEditPageButton from "./ToEditPageButton";
import { theme } from "@/src/utils/theme";

type ReflectionSettingHeaderProps = {
  username: string;
  reflectionCUID: string;
  isCurrentUser: boolean;
  isPublic: boolean;
  tocArray: { href: string; title: string }[];
};

const ReflectionSettingHeader: React.FC<ReflectionSettingHeaderProps> = ({
  username,
  reflectionCUID,
  isPublic,
  isCurrentUser,
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
      <Box
        component={"header"}
        position={"fixed"}
        top={{ xs: 0, md: 25 }}
        right={{ xs: 0, md: 35 }}
        bgcolor={{ xs: "white", md: "transparent" }}
        width={{ xs: "100%", md: "auto" }}
        zIndex={1}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          px={{ xs: 1.5, md: 0 }}
          py={{ xs: 1, md: 0 }}
          boxShadow={{ xs: "0px 0.7px 1px rgba(0, 0, 0, 0.1)", md: "none" }}
        >
          <Box mt={0.5}>
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
                    {tocArray.map((item) => (
                      <Box
                        key={item.href}
                        display={"flex"}
                        flexDirection={"column"}
                        px={2}
                        py={0.75}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            // MEMO: ヘッダーを含めた時にロジックまで飛ばすロジック
                            const targetElement = document.querySelector(
                              item.href
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
                          {item.title}
                        </Link>
                      </Box>
                    ))}
                  </Box>
                </Fade>
              )}
            </Popper>
          </Box>
          <Box mt={0.5}>
            <KebabButtonPopupContainer
              reflectionCUID={reflectionCUID}
              username={username}
              isPublic={isPublic}
              isCurrentUser={isCurrentUser}
              isReflectionSettingHeader
            />
          </Box>
          {isCurrentUser && (
            <ToEditPageButton
              username={username}
              reflectionCUID={reflectionCUID}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ReflectionSettingHeader;
