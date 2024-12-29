import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AccordionDetails, Box, Typography } from "@mui/material";
import { label } from "../../post-form/popup/select-tag/button/TagButton";
import { Accordion, AccordionSummary } from "../../ui/shared/accordion";
import { Button } from "../../ui/shared/button";
import { StyledMarkdown } from "./mark-down";
import { useAiFeedbackWatcher } from "@/src/hooks/reflection/useAiFeedbackWatcher";
import { formatDate } from "@/src/utils/date-helper";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";
import { theme } from "@/src/utils/theme";

type ReflectionArticleProps = {
  reflectionCUID: string;
  username: string;
  userImage: string;
  createdAt: string;
  title: string;
  content: string;
  aiFeedback: string;
  onSendToSQS: () => Promise<void>;
  activeTags: string[];
};

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
  reflectionCUID,
  username,
  userImage,
  createdAt,
  title,
  content,
  aiFeedback,
  onSendToSQS,
  activeTags
}) => {
  const [animatedFeedback, setAnimatedFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ボタン押下時の状態を管理
  const realTimeAIFeedback = useAiFeedbackWatcher(reflectionCUID);
  const plainContent = removeHtmlTags(content);
  const [isAnimating, setIsAnimating] = useState(false);

  // NOTE: 現状AIにFBもらえるのは100文字以上かつまだAIからのフィードバックがない場合のみ
  const isAiCallButtonEnabled =
    plainContent.length > 100 && realTimeAIFeedback === null;

  // TODO: ここから下ははリファクタしてシンプルにします(yusei53)
  const animateFeedback = (text: string) => {
    setAnimatedFeedback("");
    let index = 0;
    setIsAnimating(true);

    const interval = setInterval(() => {
      if (index < text.length) {
        setAnimatedFeedback((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 30);
  };

  const handleSendToSQS = async () => {
    setIsLoading(true);
    await onSendToSQS();
    setIsLoading(false);
  };

  useEffect(() => {
    if (realTimeAIFeedback && !isAnimating) {
      animateFeedback(realTimeAIFeedback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realTimeAIFeedback]);

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
      <Accordion>
        <AccordionSummary>
          <Typography fontSize={17} fontWeight={"bold"}>
            AIに聞いてみる
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ py: 0.5, px: 0 }}>
          <Button onClick={handleSendToSQS} disabled={!isAiCallButtonEnabled}>
            AIからフィードバックをもらう
          </Button>
          <Typography fontSize={12} color={theme.palette.grey[600]}>
            文字数が100文字以上、かつまだAIからのフィードバックがない場合のみAIにフィードバックをもらえます
          </Typography>
          <Typography my={3}>
            {aiFeedback
              ? aiFeedback
              : isLoading
                ? "考えてます..."
                : realTimeAIFeedback
                  ? animatedFeedback
                  : ""}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
