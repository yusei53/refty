"use client";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ReflectionArticle } from "@/src/components/reflection-detail/article";
import { UserInformationSection } from "@/src/components/reflection-detail/user-information/UserInformationSection";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { animation } from "@/src/components/ui/shared/animation";
import { SendToSqsAPI } from "@/src/api/send-to-sqs-api";
import { use } from "react";

type ReflectionDetailPageProps = {
  title: string;
  content: string;
  createdAt: string;
  userImage: string;
  username: string;
  reflectionCount: number;
};

const ReflectionDetailPage: React.FC<ReflectionDetailPageProps> = ({
  title,
  content,
  createdAt,
  userImage,
  username,
  reflectionCount,
}) => {
    const router = useRouter();
    const reflectionCUID = usePathname().split("/").pop();
    if(!reflectionCUID) return null;
    console.log(reflectionCUID);
  const searchParams = useSearchParams();

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
    const response = await SendToSqsAPI.handleSendToSQS({
        content,
        reflectionCUID,
    });
    if (response === 400 || response === 401 || response === 403) return;
    alert("送信しました");
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
          cursor: "pointer",
        }}
      />
      <ReflectionArticle
        username={username}
        userImage={userImage}
        createdAt={createdAt}
        title={title}
        content={content}
        onSendToSQS={handleSendToSQS}
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
