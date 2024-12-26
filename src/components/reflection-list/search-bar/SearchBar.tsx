import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Stack, Slide } from "@mui/material";
import { TagButton } from "../../post-form/popup/select-tag/button/TagButton";
import { theme } from "@/src/utils/theme";

type SearchBarProps = {
  tags: string[];
  selectedTag: string | null;
  showTags: boolean;
  onToggleTags: () => void;
  onTagClick: (tag: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  tags,
  selectedTag,
  showTags,
  onToggleTags,
  onTagClick
}) => {
  return (
    <Box display={"flex"} alignItems={"center"} mx={3} mb={1.5}>
      <IconButton
        aria-label={"タグで検索"}
        onClick={onToggleTags}
        sx={{
          bgcolor: `${theme.palette.grey[100]}`,
          borderRadius: 10,
          fontSize: 14
        }}
      >
        <SearchIcon sx={{ fontSize: 23 }} />
      </IconButton>
      <Box
        ml={1}
        whiteSpace={"nowrap"}
        sx={{
          overflowX: "auto"
        }}
      >
        <Stack direction="row" gap={1.2}>
          {tags.map((tag, index) => (
            <Slide
              key={tag}
              direction="right"
              in={showTags}
              timeout={300 + index * 100}
            >
              <Box>
                <TagButton
                  tag={tag}
                  onClick={() => onTagClick(tag)}
                  selected={selectedTag === tag}
                />
              </Box>
            </Slide>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
