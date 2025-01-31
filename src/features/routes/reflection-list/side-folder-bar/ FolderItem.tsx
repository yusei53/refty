import Image from "next/image";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { theme } from "@/src/utils/theme";

type FolderItemProps = {
  foldername: string;
};

const FolderItem: React.FC<FolderItemProps> = ({ foldername }) => {
  return (
    <ListItem
      sx={{
        py: 0,
        my: 1,
        borderRadius: 2,
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
          "& .hover-icons": { display: "flex" }
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: "27px" }}>
        <FolderIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
      </ListItemIcon>
      <ListItemText
        primary={foldername}
        primaryTypographyProps={{ fontSize: 14.5 }}
      />
      <Box className="hover-icons" display="none" gap={1} alignItems="center">
        <Box
          sx={{
            cursor: "pointer",
            "&:hover": {
              bgcolor: `${theme.palette.primary.contrastText}`
            }
          }}
        ></Box>
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

export default FolderItem;
