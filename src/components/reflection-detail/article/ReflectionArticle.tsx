import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { label } from "../../post-form/popup/select-tag/button/TagButton";
import { StyledMarkdown } from "./mark-down";
import { useAiFeedbackWatcher } from "@/src/hooks/reflection/useAiFeedbackWatcher";
import { formatDate } from "@/src/utils/date-helper";
import { theme } from "@/src/utils/theme";

type ReflectionArticleProps = {
  username: string;
  userImage: string;
  createdAt: string;
  title: string;
  content: string;
  onSendToSQS: () => Promise<void>;
  activeTags: string[];
  reflectionCUID: string;
};

// TODO: 内製Linkコンポーネント作ってもいいかも
export const link = {
  color: "black",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline"
  }
};

const h1 = {
  p: 0,
  width: "100%",
  fontSize: "21px",
  border: "none",
  outline: "none"
};

export const ReflectionArticle: React.FC<ReflectionArticleProps> = ({
  username,
  userImage,
  createdAt,
  title,
  content,
  onSendToSQS,
  activeTags,
  reflectionCUID
}) => {
  const aiFeedback = useAiFeedbackWatcher(reflectionCUID);
  const handleSendToSQS = async () => {
    await onSendToSQS();
  };

  return (
    <Box component={"article"}>
      <Box display={"flex"} alignItems={"center"} my={0.5}>
        <Link
          href={`/${username}`}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center"
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
      {activeTags.length > 0 && (
        <Box display={"flex"} gap={1} mt={2}>
          {activeTags.map((tag) => (
            <Typography key={tag} sx={label}>
              {tag}
            </Typography>
          ))}
        </Box>
      )}
      <Box mt={8}>
        <StyledMarkdown dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
      <button onClick={handleSendToSQS}>Send To SQS</button>
      <div>
        <h1>AI Feedback</h1>
        <p>{aiFeedback}</p>
      </div>
    </Box>
  );
};
