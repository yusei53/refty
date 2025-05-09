import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Fade, Popper, Tooltip, Typography } from "@mui/material";
import MarkdownSection from "./MarkDownSection";
import { markdownList } from "./markdown-list";
import { theme } from "@/src/app/_client/utils/theme";

type MarkdownSupportPopupAreaProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
};

const MarkdownSupportPopupArea: React.FC<MarkdownSupportPopupAreaProps> = ({
  anchorEl,
  open,
  onClick,
  onClose
}) => {
  const [showInitialTooltip, setShowInitialTooltip] = useState(true);
  const [hasRendered, setHasRendered] = useState(false);

  if (!hasRendered) {
    setHasRendered(true);
    setTimeout(() => {
      setShowInitialTooltip(false);
    }, 2800);
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setShowInitialTooltip(false);
    onClick(event);
  };
  return (
    <Box position={"relative"} display={"flex"} alignItems={"center"}>
      <Tooltip
        title={<Typography fontSize={13}>書き方ガイドはこちら</Typography>}
        placement={"bottom"}
        open={showInitialTooltip}
        arrow
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -10]
                }
              }
            ]
          }
        }}
      >
        <Box
          component={"button"}
          type={"button"}
          bgcolor={"transparent"}
          border={"none"}
          display={"flex"}
          alignItems={"center"}
          onClick={handleButtonClick}
          sx={{ cursor: "pointer" }}
        >
          <InfoOutlinedIcon
            sx={{
              color: `${theme.palette.grey[600]}`
            }}
          />
        </Box>
      </Tooltip>
      {open && (
        // MEMO: なぜかこのPopperは外側をクリックしてもスマホで閉じないため、透明なBoxを設置
        <Box
          onClick={onClose}
          position={"fixed"}
          top={0}
          left={0}
          width={"100vw"}
          height={"100vh"}
          zIndex={1}
        />
      )}
      <Popper
        disablePortal
        open={open}
        anchorEl={anchorEl}
        transition
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10]
            }
          }
        ]}
        sx={{
          zIndex: 2
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              boxShadow={1}
              borderRadius={2.5}
              bgcolor={"white"}
              zIndex={3}
              maxWidth={"320px"}
              maxHeight={"400px"}
              overflow={"auto"}
              mb={-1}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                  height: "4px"
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.grey[400],
                  borderRadius: "4px"
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: theme.palette.grey[600]
                }
              }}
              onClick={(e) => e.stopPropagation()}
              minWidth={"300px"}
            >
              {markdownList.map((markdown) => (
                <MarkdownSection
                  key={markdown.title}
                  image={markdown.image}
                  title={markdown.title}
                  description={markdown.description}
                />
              ))}
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default MarkdownSupportPopupArea;
