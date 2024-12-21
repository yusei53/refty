import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import type { SxProps} from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";

type PostNavigationButtonProps = {
  sx?: SxProps;
};

export const PostNavigationButton: React.FC<PostNavigationButtonProps> = ({
  sx
}) => {
  return (
    <Tooltip
      title={"振り返りをする"}
      placement={"top"}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -5]
              }
            }
          ]
        }
      }}
    >
      <IconButton
        aria-label={"投稿するボタン"}
        sx={{
          bgcolor: "white",
          border: "1px solid #DCDFE3",
          borderRadius: 10,
          boxShadow: 1,
          ...sx
        }}
        href={"/post"}
      >
        <AddOutlinedIcon sx={{ fontSize: 38 }} />
      </IconButton>
    </Tooltip>
  );
};
