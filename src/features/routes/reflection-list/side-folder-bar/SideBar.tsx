import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, List } from "@mui/material";
import FolderItem from "./ FolderItem";
import TagItem from "./TagItem";
import { theme } from "@/src/utils/theme";

const SideBar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const folders = ["C++", "javaScript", "Java"];
  const tags = ["振り返り", "学び", "ちいかわ"];
  return (
    <>
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
          <List>
            {folders.map((folder) => (
              <FolderItem foldername={folder} key={folder} />
            ))}
          </List>
          <List>
            {tags.map((tag) => (
              <TagItem tagname={tag} key={tag} />
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
