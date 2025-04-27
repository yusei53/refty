import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { profileAPI } from "@/src/app/_client/api/profile-api";

export type useUpdateProfileProps = {
  username: string;
  bio: string;
  goal: string;
  website: string;
};

const updateProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "3文字以上15文字以内の英数字のみで入力してください。" })
    .max(15, { message: "3文字以上15文字以内の英数字のみで入力してください。" })
    .refine(
      (value) => /^[a-zA-Z0-9]+$/.test(value) && value.trim().length > 0,
      { message: "英数字以外は使用できません。" }
    ),
  bio: z
    .string()
    .max(40, { message: "40文字以内で入力してください。" })
    .nullable(),
  goal: z
    .string()
    .max(300, { message: "300文字以内で入力してください。" })
    .nullable(),
  website: z
    .string()
    .max(100, { message: "100文字以内で入力してください。" })
    .nullable()
});

type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;

export const useUpdateProfileForm = ({
  username,
  bio,
  goal,
  website
}: useUpdateProfileProps) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, errors }
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: username,
      bio: bio,
      goal: goal,
      website: website
    }
  });

  const onSubmit = handleSubmit(async (formData: UpdateProfileSchemaType) => {
    const res = await profileAPI.updateUserProfile(
      formData.username,
      formData.bio || null,
      formData.goal || null,
      formData.website || null
    );

    if (res === 401) {
      router.push(`/login`);
    } else {
      router.push(`/${formData.username}`);
      router.refresh();
    }
  });

  return {
    control,
    setValue,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    onSubmit
  };
};
