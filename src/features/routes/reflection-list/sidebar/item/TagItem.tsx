import Image from "next/image";
import Link from "next/link";
import TagIcon from "@mui/icons-material/Tag";
import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { theme } from "@/src/utils/theme";

type TagItemProps = {
  tagKey: string;
  tagname: string;
  count: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export const TagItem: React.FC<TagItemProps> = ({
  tagKey,
  tagname,
  count,
  isSelected,
  onSelect
}) => {
  return (
    <ListItem
      sx={{
        py: 0,
        my: 1,
        borderRadius: 2,
        height: 30,
        transition: "background-color 0.3s",
        backgroundColor: isSelected ? theme.palette.grey[200] : "transparent",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
          "& .hover-icons": { display: "flex" },
          "& .secondary-text": { opacity: 1 }
        }
      }}
    >
      <Link
        href={`?tag=${tagKey}`}
        onClick={() => onSelect(tagKey)}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          width: "100%"
        }}
      >
        <ListItemIcon sx={{ minWidth: "25px" }}>
          <TagIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
        </ListItemIcon>
        <ListItemText
          primary={tagname}
          primaryTypographyProps={{
            fontSize: 14.5,
            color: "black"
          }}
          secondary={count.toString()}
          secondaryTypographyProps={{
            className: "secondary-text",
            sx: {
              opacity: 0,
              transition: "opacity 0.3s",
              color: theme.palette.grey[600],
              bgcolor: theme.palette.grey[400],
              fontSize: 12.5,
              width: 21,
              height: 21,
              borderRadius: "50%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        />
      </Link>
      <Box className="hover-icons" display="none" gap={1} alignItems="center">
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
