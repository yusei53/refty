"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleLoginForm from "../auth/GoogleLoginForm";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import ReflectionPostForm from "../reflection/ReflectionPostForm";
import { useCreateReflection } from "@/src/hooks/reflection/useCreateReflection";

export const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "タイトルは2文字以上で入力してください。" }),
  content: z
    .string()
    .min(10, { message: "本文は10文字以上で入力してください。" })
    .max(140, { message: "本文は140字以内で入力してください" }),
});

type ReflectionPostPageProps = {
  currentUser: User["id"] | undefined;
};

const ReflectionPostPage: React.FC<ReflectionPostPageProps> = ({
  currentUser,
}) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const createReflectionMutation = useCreateReflection();

  const onSubmit = (formData: any) => {
    createReflectionMutation.mutate(
      {
        title: formData.title,
        content: formData.content,
      },
      {
        onSuccess: () => {
          router.push("/reflection-list");
        },
      }
    );
  };

  return currentUser ? (
    <ReflectionPostForm
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      errors={errors}
    />
  ) : (
    <GoogleLoginForm />
  );
};

export default ReflectionPostPage;
