import { useState } from "react";
import Image from "next/image";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FolderKebabButtonPopupContainer } from "../kebab-button/FolderKebabMenuButtonContainer";
import { theme } from "@/src/utils/theme";

type FolderItemProps = {
  foldername: string;
  onSelectMode: () => void;
};

export const FolderItem: React.FC<FolderItemProps> = ({
  foldername,
  onSelectMode
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      <Box
        className="hover-icons"
        display={isPopupOpen ? "flex" : "none"}
        gap={1}
        alignItems="center"
      >
        <FolderKebabButtonPopupContainer
          onSelectMode={onSelectMode}
          onPopupChange={(open) => setIsPopupOpen(open)}
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
