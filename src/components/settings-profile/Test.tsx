"use client";
import Image from "next/image";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { ErrorMessage } from "../ui/shared/alert";
import { Button } from "../ui/shared/button";
import TextArea from "../ui/shared/text-area/TextArea";
import { theme } from "@/src/utils/theme";

type FormValues = {
  username: string;
  bio: string;
  goal: string;
  website: string;
};

type TestProps = {
  image: string;
  username: string;
  control: Control<{
    username: string;
    bio: string | null;
    goal: string | null;
    website: string | null;
  }>;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  errors: FieldErrors<FormValues>;
  onSubmit: (event: React.FormEvent) => Promise<void>;
};

// TODO: コンポーネント名を変更する
const Test: React.FC<TestProps> = ({
  image,
  username,
  control,
  isSubmitting,
  isSubmitSuccessful,
  errors,
  onSubmit
}) => {
  return (
    <Box
      my={8}
      mb={12}
      mx={{ xs: 3, sm: 12 }}
      display={"flex"}
      flexDirection={"column"}
      gap={7}
      component={"form"}
      onSubmit={onSubmit}
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
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextArea
                placeholder="username"
                rows={1}
                fullWidth
                multiline
                defaultValue={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Box>
        {errors.username && <ErrorMessage message={errors.username.message} />}
      </Box>
      <Box>
        <Typography m={0.3}>自己紹介</Typography>
        <Typography m={0.3} fontSize={13} color={`${theme.palette.grey[600]}`}>
          マイページに表示されるプロフィール文です。
        </Typography>
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="自己紹介(20文字以内)"
              rows={1}
              defaultValue={field.value || ""}
              fullWidth
              multiline
              onChange={field.onChange}
            />
          )}
        />
        {errors.bio && <ErrorMessage message={errors.bio.message} />}
      </Box>
      <Box>
        <Typography m={0.3}>目標設定</Typography>
        <Typography m={0.3} fontSize={13} color={`${theme.palette.grey[600]}`}>
          心に浮かぶ目標や夢を言葉にしてみる場所です。
        </Typography>
        <Controller
          name="goal"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="〜を達成する、〜みたいになる、〜を目指す(他の人には見えません)"
              rows={2}
              defaultValue={field.value || ""}
              fullWidth
              multiline={true}
              onChange={field.onChange}
            />
          )}
        />
        {errors.goal && <ErrorMessage message={errors.goal.message} />}
      </Box>
      <Box>
        <Typography m={0.3}>ウェブサイト</Typography>
        <Typography m={0.3} fontSize={13} color={`${theme.palette.grey[600]}`}>
          お好きな外部URLをマイページに設置できます。
        </Typography>
        <Controller
          name="website"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="https://www.refty.jp/welcome"
              rows={1}
              defaultValue={field.value || ""}
              fullWidth
              multiline={false}
              onChange={field.onChange}
            />
          )}
        />
        {errors.website && <ErrorMessage message={errors.website.message} />}
      </Box>
      <Button type="submit" disabled={isSubmitting || isSubmitSuccessful}>
        {isSubmitting || isSubmitSuccessful ? "投稿中..." : "投稿する"}
      </Button>
    </Box>
  );
};

export default Test;
