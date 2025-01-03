import { useRouter } from "next/navigation";
import { reflectionAPI } from "@/src/api/reflection-api";

type useUpdatePinnedReflectionProps = {
  reflectionCUID: string;
  isPinned: boolean;
};

export const useUpdatePinnedReflection = ({
  reflectionCUID,
  isPinned
}: useUpdatePinnedReflectionProps) => {
  const router = useRouter();

  const handleUpdatePinned = async () => {
    const result = await reflectionAPI.updatePinnedReflection({
      reflectionCUID: reflectionCUID,
      isPinned: !isPinned
    });
    if (result === 401) {
      router.push(`/login`);
    } else {
      router.refresh();
    }
  };

  return { handleUpdatePinned };
};
