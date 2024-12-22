import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TagIcon from "@mui/icons-material/Tag";
import { Box, Fade, Popper, Typography } from "@mui/material";
import { TagButton } from "./button/TagButton";
import { Button } from "@/src/components/ui/shared/button";
import { theme } from "@/src/utils/theme";

type TagSelectionPopupProps = {
  onTagChange: (tag: string, isSelected: boolean) => void;
  open: boolean;
  anchorEl: HTMLElement | null;
  onToggle: (event: React.MouseEvent<HTMLElement>) => void;
};

const TAGS = ["振り返り", "学び", "気づき", "ひとりごと", "インプットの記録"];

export const SelectTagPopup: React.FC<TagSelectionPopupProps> = ({
  onTagChange,
  open,
  anchorEl,
  onToggle
}) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    const isSelected = activeTags.includes(tag);

    // タグの状態を更新（最大2つに制限）
    const updatedTags = isSelected
      ? activeTags.filter((t) => t !== tag) // 選択解除
      : activeTags.length < 2
        ? [...activeTags, tag] // 新しいタグを追加
        : activeTags;

    if (updatedTags.length !== activeTags.length) {
      setActiveTags(updatedTags);

      // タグ状態変更を親に通知
      onTagChange(tag, !isSelected);
    }
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <Button
          onClick={onToggle}
          sx={{
            mr: 0.5,
            bgcolor: theme.palette.primary.main,
            border: "#ededed solid 1px",
            borderRadius: 2,
            height: "30px",
            p: 0
          }}
        >
          <TagIcon sx={{ color: theme.palette.grey[500], fontSize: 18 }} />
          タグ
        </Button>
        {activeTags.map((tag) => (
          <Box key={tag} display={"flex"} mx={0.4} zIndex={3}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                fontSize: 13.8,
                letterSpacing: 0.8,
                height: "30px",
                p: "4px 7px",
                borderRadius: 2,
                border: "1px solid #DCDFE3",
                backgroundColor: "white"
              }}
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
                  toggleTag(tag);
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement={"bottom-start"}
        style={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              p={1}
              maxWidth="280px"
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
                    onClick={() => toggleTag(tag)}
                    selected={activeTags.includes(tag)} // 選択状態を反映
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
