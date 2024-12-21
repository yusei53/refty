"use client";
import { ReflectionArticle } from "@/src/components/reflection-detail/article";
import { UserInformationSection } from "@/src/components/reflection-detail/user-information/UserInformationSection";
import { animation } from "@/src/components/ui/shared/animation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

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
  reflectionCount
}) => {
  const router = useRouter();
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
        username={username}
        userImage={userImage}
        createdAt={createdAt}
        title={title}
        content={content}
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
