import { Box, Fade, Popper } from "@mui/material";
import { label, TagButton } from "./button/TagButton";
import { Button } from "@/src/components/ui/shared/button";
import { theme } from "@/src/utils/theme";

type TagSelectionPopupProps = {
  selectedTags: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  open: boolean;
  anchorEl: HTMLElement | null;
  onToggle: (event: React.MouseEvent<HTMLElement>) => void;
};

const tags = [
  "学び",
  "気づき",
  "ひとりごと",
  "1日の振り返り",
  "インプットの記録"
];
export const SelectTagPopup: React.FC<TagSelectionPopupProps> = ({
  selectedTags,
  onChange,
  open,
  anchorEl,
  onToggle
}) => {
  const toggleTag = (tag: string) => {
    onChange((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <Button onClick={onToggle}>タグ</Button>
        <Box display={"flex"} gap={1}>
          {selectedTags.map((tag) => (
            <Box key={tag} sx={label}>
              {tag}
            </Box>
          ))}
        </Box>
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
              padding={1.2}
              gap={1}
              maxWidth={"280px"}
              display={"flex"}
              flexWrap={"wrap"}
              bgcolor={`${theme.palette.primary.main}`}
              border={`1px solid ${theme.palette.grey[400]}`}
              borderRadius={4}
            >
              {tags.map((tag) => (
                <TagButton key={tag} tag={tag} onClick={() => toggleTag(tag)} />
              ))}
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
