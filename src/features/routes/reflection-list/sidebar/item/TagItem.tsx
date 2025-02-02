import Image from "next/image";
import Link from "next/link";
import TagIcon from "@mui/icons-material/Tag";
import { Box, ListItem, ListItemIcon, Typography } from "@mui/material";
import { theme } from "@/src/utils/theme";

type TagItemProps = {
  tagKey: string;
  tagname: string;
};

export const TagItem: React.FC<TagItemProps> = ({ tagKey, tagname }) => {
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
      <Link
        href={`?tag=${tagKey}`}
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
        <Box display={"flex"} alignItems={"center"}>
          <Typography color="black">{tagname}</Typography>
          <Typography
            color={theme.palette.grey[600]}
            bgcolor={theme.palette.grey[400]}
            fontSize={13}
            width={20}
            height={20}
            borderRadius={10}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            8
          </Typography>
        </Box>
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
