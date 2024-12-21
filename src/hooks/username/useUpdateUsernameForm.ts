import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import usernameAPI from "@/src/api/username-api";

const updateUsernameSchema = z.object({
  username: z
    .string()
    .min(4, { message: "4文字以上の英数字のみで入力してください。" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "英数字のみで入力してください。"
    })
});

type UpdateUsernameSchemaType = z.infer<typeof updateUsernameSchema>;

export const useUpdateUsernameForm = (username: string | null) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors }
  } = useForm<UpdateUsernameSchemaType>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: { username: username || "" }
  });

  const onSubmit = handleSubmit(async (formData: UpdateUsernameSchemaType) => {
    const res = await usernameAPI.updateUsername(formData);

    // MEMO: 401が返ってきたらログイン画面に遷移
    if (res === 401) {
      router.push(`/`);
    } else {
      router.push(`/${formData.username}`);
    }
  });

  return {
    control,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    onSubmit
  };
};
