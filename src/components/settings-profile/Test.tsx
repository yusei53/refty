"use client";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import TextArea from "../ui/shared/text-area/TextArea";
import { theme } from "@/src/utils/theme";

type TestProps = {
  image: string;
  username: string;
  bio: string;
  goal: string;
  website: string;
};

const Test: React.FC<TestProps> = ({ image, username, bio, goal, website }) => {
  return (
    <Box
      mx={{ xs: 3, sm: 12 }}
      display={"flex"}
      flexDirection={"column"}
      gap={7}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Image
          src={image}
          alt={`${username}のプロフィール画像`}
          width={90}
          height={90}
          style={{ borderRadius: 100 }}
        />
        <Typography mt={3} fontSize={18} fontWeight={550}>
          {username}のプロフィール設定
        </Typography>
      </Box>
      <Box>
        <Typography m={0.3}>ユーザーネーム</Typography>
        <Box display={"flex"} alignItems={"baseline"}>
          <Typography
            component={"span"}
            m={0.3}
            whiteSpace={"nowrap"}
            fontSize={16}
            letterSpacing={0.8}
          >
            https://www.refty.jp/
          </Typography>
          <TextArea
            placeholder="username"
            rows={1}
            defaultValue={username}
            fullWidth
            multiline={true}
          />
        </Box>
      </Box>
      <Box>
        <Typography m={0.3}>自己紹介</Typography>
        <Typography m={0.3} fontSize={13} color={`${theme.palette.grey[600]}`}>
          マイページに表示されるプロフィール文です。
        </Typography>
        <TextArea
          placeholder="自己紹介(20文字以内)"
          rows={1}
          defaultValue={bio}
          fullWidth
          multiline={true}
        />
      </Box>
      <Box>
        <Typography m={0.3}>目標設定</Typography>
        <Typography m={0.3} fontSize={13} color={`${theme.palette.grey[600]}`}>
          心に浮かぶ目標や夢を言葉にしてみる場所です。
        </Typography>
        <TextArea
          placeholder="〜を達成する、〜みたいになる、〜を目指す(他の人には見えません)"
          rows={2}
          defaultValue={goal}
          fullWidth
          multiline={true}
        />
      </Box>
      <Box>
        <Typography m={0.3}>ウェブサイト</Typography>
        <Typography m={0.3} fontSize={13} color={`${theme.palette.grey[600]}`}>
          お好きな外部URLをマイページに設置できます。
        </Typography>
        <TextArea
          placeholder="https://www.refty.jp/welcome"
          rows={1}
          defaultValue={website}
          fullWidth
          multiline={false}
        />
      </Box>
    </Box>
  );
};

export default Test;
