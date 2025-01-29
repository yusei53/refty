import { List } from "@mui/material";
import Folder from "./ Folder";

const FolderList: React.FC = () => {
  const folders = ["C++", "javaScript", "Java"];
  return (
    <List>
      {folders.map((folder) => (
        <Folder foldername={folder} key={folder} />
      ))}
    </List>
  );
};

export default FolderList;
