import Link from "next/link";
import Image from "next/image";
import { theme } from "@/src/utils/theme";
import { Box, Typography } from "@mui/material";
import { formatDate } from "@/src/utils/date-helper";
import { StyledMarkdown } from "./mark-down";

type ReflectionArticleProps = {
  username: string;
  userImage: string;
  createdAt: string;
  title: string;
  content: string;
};

// TODO: 内製Linkコンポーネント作ってもいいかも
export const link = {
  color: "black",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
};

const h1 = {
  p: 0,
  width: "100%",
  fontSize: "21px",
  border: "none",
  outline: "none",
  marginBottom: 8,
};

export const ReflectionArticle: React.FC<ReflectionArticleProps> = ({
  username,
  userImage,
  createdAt,
  title,
  content,
}) => {
  return (
    <Box component={"article"}>
      <Box display={"flex"} alignItems={"center"} my={0.5}>
        <Link
          href={`/${username}`}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src={userImage}
            alt={`${username}の画像`}
            width={25}
            height={25}
            priority
            style={{ borderRadius: 20, marginRight: 8 }}
          />
          <Typography sx={link} mr={1.5}>
            {username}
          </Typography>
        </Link>
        <Image
          src={"/calendar.svg"}
          alt={"カレンダーアイコン"}
          width={15}
          height={15}
        />
        <Typography component={"time"} color={theme.palette.grey[600]} ml={0.3}>
          {formatDate(createdAt)}
        </Typography>
      </Box>
      <Typography component={"h1"} sx={h1}>
        {title}
      </Typography>
      <StyledMarkdown dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
};
