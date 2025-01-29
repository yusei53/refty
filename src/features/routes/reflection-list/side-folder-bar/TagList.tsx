import { List } from "@mui/material";
import Tag from "./Tag";

const TagList: React.FC = () => {
  const tags = ["振り返り", "学び", "ちいかわ"];
  return (
    <List>
      {tags.map((tag) => (
        <Tag tagname={tag} key={tag} />
      ))}
    </List>
  );
};

export default TagList;
