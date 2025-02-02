import Image from "next/image";
import TagIcon from "@mui/icons-material/Tag";
import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { theme } from "@/src/utils/theme";

type TagItemProps = {
  tagname: string;
};

export const TagItem: React.FC<TagItemProps> = ({ tagname }) => {
  return (
    <ListItem
      sx={{
        py: 0,
        my: 1,
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
          "& .hover-icons": { display: "flex" }
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: "25px" }}>
        <TagIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
      </ListItemIcon>
      <ListItemText
        primary={tagname}
        primaryTypographyProps={{ fontSize: 14.5, noWrap: true }}
      />
      <Box className="hover-icons" display="none" gap={1} alignItems="center">
        <Image
          src={"/kebab-menu.svg"}
          alt={"ケバブボタン"}
          width={22}
          height={22}
        />
        <Image
          src={"/book.svg"}
          alt={"ブックアイコン"}
          width={22}
          height={22}
        />
      </Box>
    </ListItem>
  );
};
