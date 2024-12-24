import { useRouter } from "next/navigation";
import type { Reflection } from "@/src/api/reflection-api";
import { reflectionAPI } from "@/src/api/reflection-api";

type useUpdatePinnedReflectionProps = {
  reflection: Pick<Reflection, "reflectionCUID" | "isPublic">;
};

export const useUpdatePublicReflection = ({
  reflection
}: useUpdatePinnedReflectionProps) => {
  const router = useRouter();

  const handleUpdatePublic = async () => {
    const result = await reflectionAPI.updatePublicReflection({
      reflectionCUID: reflection.reflectionCUID,
      isPublic: !reflection.isPublic
    });
    if (result === 401) {
      router.push(`/login`);
    } else {
      router.refresh();
    }
  };

  return { handleUpdatePublic };
};
