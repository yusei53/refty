import Image from "next/image";
import { type Control, type FieldErrors } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { Button } from "../ui/shared/button";
import FieldHeader from "./form/FieldHeader";
import FieldInput from "./form/FieldInput";

type FormValues = {
  username: string;
  bio: string;
  goal: string;
  website: string;
};

type SettingProfileFormFieldProps = {
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

const SettingProfileFormField: React.FC<SettingProfileFormFieldProps> = ({
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
      component={"form"}
      my={8}
      mb={12}
      mx={{ xs: 3, sm: 12 }}
      display={"flex"}
      flexDirection={"column"}
      gap={7}
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
        <FieldHeader label="ユーザーネーム" />
        <FieldInput
          name="username"
          placeholder="username"
          rows={1}
          control={control}
          errors={errors}
        />
      </Box>
      <Box>
        <FieldHeader
          label="自己紹介"
          description="マイページに表示されるプロフィール文です。"
        />
        <FieldInput
          name="bio"
          placeholder="自己紹介(20文字以内)"
          rows={1}
          control={control}
          errors={errors}
        />
      </Box>
      <Box>
        <FieldHeader
          label="目標設定"
          description="心に浮かぶ目標や夢を言葉にしてみる場所です。"
        />
        <FieldInput
          name="goal"
          placeholder="〜を達成する、〜みたいになる"
          rows={2}
          allowMultiline
          control={control}
          errors={errors}
        />
      </Box>
      <Box>
        <FieldHeader
          label="ウェブサイト"
          description="お好きな外部URLをマイページに設置できます。"
        />
        <FieldInput
          name="website"
          placeholder="https://www.refty.jp/welcome"
          rows={1}
          control={control}
          errors={errors}
        />
      </Box>
      <Button type="submit" disabled={isSubmitting || isSubmitSuccessful}>
        {isSubmitting || isSubmitSuccessful ? "投稿中..." : "投稿する"}
      </Button>
    </Box>
  );
};

export default SettingProfileFormField;
