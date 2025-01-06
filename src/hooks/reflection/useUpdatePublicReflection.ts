import { useRouter } from "next/navigation";
import { reflectionAPI } from "@/src/api/reflection-api";

type useUpdatePinnedReflectionProps = {
  reflectionCUID: string;
  isPublic: boolean;
};

export const useUpdatePublicReflection = ({
  reflectionCUID,
  isPublic
}: useUpdatePinnedReflectionProps) => {
  const router = useRouter();

  const handleUpdatePublic = async () => {
    const result = await reflectionAPI.updatePublicReflection({
      reflectionCUID: reflectionCUID,
      isPublic: !isPublic
    });
    if (result === 401) {
      router.push(`/login`);
    } else {
      router.refresh();
    }
  };

  return { handleUpdatePublic };
};
