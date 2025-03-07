import CloseIcon from "@mui/icons-material/Close";
import TagIcon from "@mui/icons-material/Tag";
import { Box, Fade, Popper, Typography } from "@mui/material";
import { label, TagButton } from "../../../../../components/button/TagButton";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type TagSelectionPopupProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  activeTags: string[];
  onPopupOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onToggleTag: (tag: string) => void;
};

export const TAGS = [
  "振り返り",
  "学び",
  "気づき",
  "ひとりごと",
  "インプットの記録"
];

export const SelectTagPopup: React.FC<TagSelectionPopupProps> = ({
  open,
  anchorEl,
  activeTags,
  onPopupOpen,
  onToggleTag
}) => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <Button
          onClick={onPopupOpen}
          sx={{
            mx: 0.5,
            bgcolor: theme.palette.primary.main,
            border: "#ededed solid 1px",
            borderRadius: 2,
            height: "30px",
            display: "flex",
            alignItems: "center",
            p: 1
          }}
        >
          <TagIcon sx={{ color: theme.palette.grey[500], fontSize: 18 }} />
          タグ
        </Button>

        {activeTags.map((tag) => (
          <Box key={tag} display={"flex"} mx={0.4} zIndex={3}>
            <Box
              display={"flex"}
              alignItems={"center"}
              height={"30px"}
              sx={label}
            >
              {tag}
              <CloseIcon
                sx={{
                  color: theme.palette.grey[500],
                  fontSize: 15,
                  ml: 0.5,
                  cursor: "pointer"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTag(tag);
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
      { /* TODO: disablePortal の動作を確認する */ }
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement={"bottom-start"}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 5]
            }
          }
        ]}
        style={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              p={1}
              maxWidth="250px"
              bgcolor="#f8fbff"
              border={`1px solid ${theme.palette.grey[400]}`}
              borderRadius={4}
            >
              <Typography
                component={"span"}
                sx={{ color: theme.palette.grey[500] }}
                fontSize={12}
                ml={1}
              >
                2つまで選択できます
              </Typography>
              <Box display={"flex"} flexWrap={"wrap"} gap={1} mt={0.5}>
                {TAGS.map((tag) => (
                  <TagButton
                    key={tag}
                    tag={tag}
                    onClick={() => onToggleTag(tag)}
                    selected={activeTags.includes(tag)}
                  />
                ))}
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
