import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { folderAPI } from "@/src/app/_client/api/folder-api";

export const createFolderSchema = z.object({
  name: z
    .string()
    .min(1, { message: "フォルダ名は1文字以上で入力してください。" })
    .max(15, { message: "フォルダ名は15文字以内で入力してください。" })
    .refine((value) => value.trim().length > 0, {
      message: "空白のみの作成はできません。"
    })
});

export type CreateFolderSchemaType = z.infer<typeof createFolderSchema>;

type UseCreateFolderProps = {
  username: string | undefined;
  onRefetch: (username: string) => Promise<void>;
  setIsEditing: (isEditing: boolean) => void;
};

export const useCreateFolder = ({
  username,
  onRefetch,
  setIsEditing
}: UseCreateFolderProps) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors }
  } = useForm<CreateFolderSchemaType>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: { name: "" }
  });

  if (!username) {
    return;
  }

  const onSubmit = handleSubmit(async (formData: CreateFolderSchemaType) => {
    const res = await folderAPI.createFolder(username, formData.name);

    if (res === 401) {
      router.push(`/`);
      router.refresh();
    } else {
      onRefetch(username);
      reset();
      setIsEditing(false);
    }
  });

  return {
    control,
    isSubmitting,
    isSubmitSuccessful,
    reset,
    errors,
    onSubmit
  };
};
