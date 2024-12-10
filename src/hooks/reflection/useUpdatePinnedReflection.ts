import { Reflection, reflectionAPI } from "@/src/api/reflection-api";
import { useRouter } from "next/navigation";

type useUpdatePinnedReflectionProps = {
  reflection: Pick<Reflection, "reflectionCUID" | "isPinned">;
};

export const useUpdatePinnedReflection = ({
  reflection,
}: useUpdatePinnedReflectionProps) => {
  const router = useRouter();

  const handleUpdatePinned = async () => {
    const result = await reflectionAPI.updatePinnedReflection({
      reflectionCUID: reflection.reflectionCUID,
      isPinned: !reflection.isPinned,
    });
    if (result === 401) {
      router.push(`/login`);
    } else {
      router.refresh();
    }
  };

  return { handleUpdatePinned };
};
