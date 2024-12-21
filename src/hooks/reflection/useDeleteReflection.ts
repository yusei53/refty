import { useRouter } from "next/navigation";
import { reflectionAPI } from "@/src/api/reflection-api";

type useDeleteReflectionProps = {
  reflectionCUID: string;
};

export const useDeleteReflection = ({
  reflectionCUID
}: useDeleteReflectionProps) => {
  const router = useRouter();

  const handleDeleteReflection = async () => {
    const responseStatus = await reflectionAPI.deleteReflection(reflectionCUID);

    if (responseStatus === 401) {
      router.push(`/login`);
    } else {
      router.refresh();
    }
  };

  return {
    handleDeleteReflection
  };
};
