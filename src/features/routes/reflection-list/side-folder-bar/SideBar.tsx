import { Box } from "@mui/material";
import FolderIcon from "./FolderIcon ";
import FolderList from "./FolderList";
import TagList from "./TagList";
import { theme } from "@/src/utils/theme";

type SideBarProps = {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar: React.FC<SideBarProps> = ({ setSidebarOpen, isSidebarOpen }) => {
  return (
    <>
      <FolderIcon setSidebarOpen={setSidebarOpen} />
      <Box
        position={"fixed"}
        top={0}
        left={isSidebarOpen ? 0 : "-250px"}
        width={"240px"}
        height={"100vh"}
        borderRight={`1px solid ${theme.palette.grey[400]}`}
        px={1.2}
        sx={{
          transition: "left 0.3s ease-in-out",
          backgroundColor: "white"
        }}
      >
        <Box my={10}>
          <FolderList />
          <TagList />
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
