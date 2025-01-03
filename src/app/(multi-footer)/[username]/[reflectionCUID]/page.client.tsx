"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box } from "@mui/material";
import { sqsAPI } from "@/src/api/send-to-sqs-api";
import { ReflectionArticle } from "@/src/components/reflection-detail/article";
import { UserInformationSection } from "@/src/components/reflection-detail/user-information/UserInformationSection";
import { animation } from "@/src/components/ui/shared/animation";
import { useParseTagsToValue } from "@/src/hooks/reflection-tag/useParseTagsToValue";

type ReflectionDetailPageProps = {
  title: string;
  content: string;
  isDailyReflection: boolean;
  isLearning: boolean;
  isAwareness: boolean;
  isInputLog: boolean;
  isMonologue: boolean;
  aiFeedback: string;
  createdAt: string;
  userImage: string;
  username: string;
  reflectionCount: number;
};

const ReflectionDetailPage: React.FC<ReflectionDetailPageProps> = ({
  title,
  content,
  isDailyReflection,
  isLearning,
  isAwareness,
  isInputLog,
  isMonologue,
  aiFeedback,
  createdAt,
  userImage,
  username,
  reflectionCount
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { parseTagsToValue } = useParseTagsToValue();
  const reflectionCUID = usePathname().split("/").pop();
  if (!reflectionCUID) return null;
  const activeTags = [
    isDailyReflection && parseTagsToValue("isDailyReflection"),
    isLearning && parseTagsToValue("isLearning"),
    isAwareness && parseTagsToValue("isAwareness"),
    isInputLog && parseTagsToValue("isInputLog"),
    isMonologue && parseTagsToValue("isMonologue")
  ].filter(Boolean) as string[];

  const handleBackNavigation = () => {
    // MEMO: 投稿編集後のリダイレクトで来た場合と外部からきたときは/{username}に戻り、それ以外は一つ前のページに戻る
    if (searchParams.get("updated") === "true") {
      router.push(`/${username}`);
    } else if (window.history.length > 1) {
      router.back();
    } else {
      router.push(`/${username}`);
    }
  };
  const handleSendToSQS = async () => {
    const response = await sqsAPI.sendToSQS({
      content,
      reflectionCUID
    });
    if (response === 401 || response === 403 || response === 500) {
      alert("送信に失敗しました。時間をおいて再度お試しください。");
      return;
    }
  };

  return (
    <Box
      minHeight={"80vh"}
      my={10}
      mx={{ xs: 0.5, md: 12 }}
      position={"relative"}
      sx={{ ...animation(0.6) }}
    >
      <KeyboardBackspaceIcon
        onClick={handleBackNavigation}
        sx={{
          position: { xs: "absolute", md: "fixed" },
          left: { xs: 0, md: 20 },
          top: { xs: -60, md: 20 },
          cursor: "pointer"
        }}
      />
      <ReflectionArticle
        reflectionCUID={reflectionCUID}
        username={username}
        userImage={userImage}
        createdAt={createdAt}
        title={title}
        content={content}
        aiFeedback={aiFeedback}
        onSendToSQS={handleSendToSQS}
        activeTags={activeTags}
      />
      <UserInformationSection
        username={username}
        userImage={userImage}
        reflectionCount={reflectionCount}
      />
    </Box>
  );
};

export default ReflectionDetailPage;
