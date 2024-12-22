import CloseIcon from "@mui/icons-material/Close";
import TagIcon from "@mui/icons-material/Tag";
import { Box, Fade, Popper, Typography } from "@mui/material";
import { TagButton } from "./button/TagButton";
import { Button } from "@/src/components/ui/shared/button";
import { theme } from "@/src/utils/theme";

type TagSelectionPopupProps = {
  selectedTags: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  open: boolean;
  anchorEl: HTMLElement | null;
  onToggle: (event: React.MouseEvent<HTMLElement>) => void;
};

const tags = ["学び", "気づき", "ひとりごと", "振り返り", "インプットの記録"];

const label = {
  fontSize: 13.8,
  letterSpacing: 0.8,
  height: "30px",
  p: "4px 7px",
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};

export const SelectTagPopup: React.FC<TagSelectionPopupProps> = ({
  selectedTags,
  onChange,
  open,
  anchorEl,
  onToggle
}) => {
  const toggleTag = (tag: string) => {
    onChange((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      }
      if (prevTags.length >= 2) {
        return prevTags;
      }
      return [...prevTags, tag];
    });
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <Button
          onClick={onToggle}
          sx={{
            mr: 0.5,
            bgcolor: `${theme.palette.primary.main}`,
            border: "#ededed solid 1px", // TODO: このカラーコードはthemeから取得する
            borderRadius: 2,
            height: "30px",
            p: 0
          }}
        >
          <TagIcon
            sx={{
              color: `${theme.palette.grey[500]}`,
              fontSize: 18
            }}
          />
          タグ
        </Button>
        {selectedTags.map((tag) => (
          <Box key={tag} display={"flex"} mx={0.4} zIndex={3}>
            <Box display={"flex"} alignItems={"center"} sx={label}>
              {tag}
              <CloseIcon
                sx={{
                  color: `${theme.palette.grey[500]}`,
                  fontSize: 15,
                  ml: 0.5,
                  cursor: "pointer"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((prevTags) => prevTags.filter((t) => t !== tag));
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
              maxWidth={"280px"}
              bgcolor={`#f8fbff`}
              border={`1px solid ${theme.palette.grey[400]}`}
              borderRadius={4}
            >
              <Typography
                component={"span"}
                sx={{ color: `${theme.palette.grey[500]}` }}
                fontSize={12}
                ml={1}
              >
                2つまで選択できます
              </Typography>
              <Box display={"flex"} flexWrap={"wrap"} gap={1} mt={0.5}>
                {tags.map((tag) => (
                  <TagButton
                    key={tag}
                    tag={tag}
                    onClick={() => toggleTag(tag)}
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
