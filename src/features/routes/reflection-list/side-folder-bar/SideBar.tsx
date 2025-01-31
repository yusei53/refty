import { useState } from "react";
import { Box, List } from "@mui/material";
import Folder from "./ Folder";
import FolderIcon from "./FolderIcon ";
import Tag from "./Tag";
import { theme } from "@/src/utils/theme";

const SideBar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const folders = ["C++", "javaScript", "Java"];
  const tags = ["振り返り", "学び", "ちいかわ"];
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
          <List>
            {folders.map((folder) => (
              <Folder foldername={folder} key={folder} />
            ))}
          </List>
          <List>
            {tags.map((tag) => (
              <Tag tagname={tag} key={tag} />
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
