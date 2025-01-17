"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { sqsAPI } from "@/src/api/send-to-sqs-api";
import { TableOfContents } from "@/src/components/reflection-detail/table-of-contents";
import { animation } from "@/src/features/common/animation";
import { ReflectionArticle } from "@/src/features/routes/reflection-detail/article";
import ReflectionSettingHeader from "@/src/features/routes/reflection-detail/header/ReflectionSettingHeader";
import { UserInformationSection } from "@/src/features/routes/reflection-detail/user-information";
import { useCreateTableOfContents } from "@/src/hooks/reflection/useCreateTableOfContents";
import { useParseTagsToValue } from "@/src/hooks/reflection-tag/useParseTagsToValue";

type ReflectionDetailPageProps = {
  title: string;
  content: string;
  isDailyReflection: boolean;
  isLearning: boolean;
  isAwareness: boolean;
  isInputLog: boolean;
  isMonologue: boolean;
  isPublic: boolean;
  isCurrentUser: boolean;
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
  isPublic,
  isCurrentUser,
  aiFeedback,
  createdAt,
  userImage,
  username,
  reflectionCount
}) => {
  const { tocArray } = useCreateTableOfContents();

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
      <ReflectionSettingHeader
        username={username}
        reflectionCUID={reflectionCUID}
        isCurrentUser={isCurrentUser}
        isPublic={isPublic}
        tocArray={tocArray}
        onBackNavigation={handleBackNavigation}
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
      <TableOfContents />
    </Box>
  );
};

export default ReflectionDetailPage;
