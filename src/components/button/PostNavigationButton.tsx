import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IconButton, Tooltip } from "@mui/material";

export const PostNavigationButton = () => {
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
          position: "fixed",
          right: { xs: 40, sm: 130 },
          bottom: { xs: 70, sm: 50 }
        }}
        href={"/post"}
      >
        <AddOutlinedIcon sx={{ fontSize: 38 }} />
      </IconButton>
    </Tooltip>
  );
};
