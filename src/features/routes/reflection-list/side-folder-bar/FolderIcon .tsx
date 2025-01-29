import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { theme } from "@/src/utils/theme";

type FolderIconProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FolderIcon: React.FC<FolderIconProps> = ({ setSidebarOpen }) => {
  return (
    <IconButton
      disableRipple
      onClick={() => setSidebarOpen((prev) => !prev)}
      sx={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 10
      }}
    >
      <MenuIcon sx={{ color: theme.palette.grey[500] }} />
    </IconButton>
  );
};

export default FolderIcon;
