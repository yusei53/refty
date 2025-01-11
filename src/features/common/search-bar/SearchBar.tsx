import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Stack, Slide, Typography } from "@mui/material";
import { TagButton } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type SearchBarProps = {
  tags: string[];
  selectedTag: string | null;
  isOpenTagList: boolean;
  selectedTagCount: number;
  onToggleTags: () => void;
  onTagChange: (tag: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  tags,
  selectedTag,
  isOpenTagList,
  selectedTagCount,
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
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              display: "none"
            }
          }}
        >
          <Stack direction="row" gap={1.2}>
            {tags.map((tag, index) => (
              <Slide
                key={tag}
                direction="right"
                in={isOpenTagList}
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
      <Box my={{ xs: 1.2, sm: 0.5 }} ml={1} letterSpacing={0.8} height={"15px"}>
        {selectedTag && (
          <>
            <Typography component={"span"} fontWeight={550}>
              {`#${selectedTag}`}
            </Typography>
            {`　${selectedTagCount}件`}
          </>
        )}
      </Box>
    </Box>
  );
};
