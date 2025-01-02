import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Stack, Slide, Typography } from "@mui/material";
import type { ReflectionTagCountList } from "@/src/api/reflection-api";
import { TagButton } from "../../../post-form/popup/select-tag/button/TagButton";
import { theme } from "@/src/utils/theme";

type SearchBarProps = {
  tags: string[];
  selectedTag: string | null;
  isOpenTagList: boolean;
  tagCountList: ReflectionTagCountList;
  onToggleTags: () => void;
  onTagChange: (tag: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  tags,
  selectedTag,
  isOpenTagList,
  tagCountList,
  onToggleTags,
  onTagChange
}) => {
  let tagCount = 0;

  switch (selectedTag) {
    case "振り返り":
      tagCount = tagCountList.isDailyReflection;
      break;
    case "学び":
      tagCount = tagCountList.isLearning;
      break;
    case "気づき":
      tagCount = tagCountList.isAwareness;
      break;
    case "ひとりごと":
      tagCount = tagCountList.isMonologue;
      break;
    case "インプットの記録":
      tagCount = tagCountList.isInputLog;
      break;
    default:
      tagCount = 0;
  }

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
            {`　${tagCount}件`}
          </>
        )}
      </Box>
    </Box>
  );
};
