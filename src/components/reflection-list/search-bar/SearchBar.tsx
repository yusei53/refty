import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Stack, Slide, Typography } from "@mui/material";
import { TagButton } from "../../post-form/popup/select-tag/button/TagButton";
import { theme } from "@/src/utils/theme";

type SearchBarProps = {
  tags: string[];
  selectedTag: string | null;
  showTags: boolean;
  count: number;
  onToggleTags: () => void;
  onTagChange: (tag: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  tags,
  selectedTag,
  showTags,
  count,
  onToggleTags,
  onTagChange
}) => {
  return (
    <Box mx={3}>
      <Box display={"flex"} alignItems={"center"} mb={1.5}>
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
                    onClick={() => onTagChange(tag)}
                    selected={selectedTag === tag}
                  />
                </Box>
              </Slide>
            ))}
          </Stack>
        </Box>
      </Box>
      {selectedTag && (
        <Typography my={2} ml={1} letterSpacing={0.8}>
          <Typography component={"span"} fontFamily={"emoji"} fontWeight={550}>
            {`#${selectedTag}`}
          </Typography>
          {` の検索結果 ${count}件`}
        </Typography>
      )}
    </Box>
  );
};
