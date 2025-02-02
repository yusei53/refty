import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FolderKebabButtonPopupContainer } from "../kebab-button/FolderKebabMenuButtonContainer";
import { theme } from "@/src/utils/theme";

type FolderItemProps = {
  folderUUID: string;
  foldername: string;
  onSelectMode: () => void;
  isSelected: boolean;
  onSelect: (folderUUID: string) => void;
};

export const FolderItem: React.FC<FolderItemProps> = ({
  folderUUID,
  foldername,
  onSelectMode,
  isSelected,
  onSelect
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <ListItem
      sx={{
        py: 0,
        my: 1,
        borderRadius: 2,
        transition: "background-color 0.3s",
        backgroundColor: isSelected ? theme.palette.grey[200] : "transparent",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
          "& .hover-icons": { display: "flex" }
        }
      }}
    >
      <Link
        href={`?folder=${folderUUID}`}
        onClick={() => {
          onSelect(folderUUID);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          width: "100%"
        }}
      >
        <ListItemIcon sx={{ minWidth: "27px" }}>
          <FolderIcon
            fontSize="small"
            sx={{ color: theme.palette.grey[500] }}
          />
        </ListItemIcon>
        <ListItemText
          primary={foldername}
          primaryTypographyProps={{ fontSize: 14.5 }}
          sx={{ color: "black" }}
        />
      </Link>
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
