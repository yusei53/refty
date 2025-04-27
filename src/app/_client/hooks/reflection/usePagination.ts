import { useRouter, useSearchParams } from "next/navigation";

export const usePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const currentTag = searchParams.get("tag");
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", value.toString());
    if (currentTag) {
      newParams.set("tag", currentTag);
    }

    router.push(`?${newParams.toString()}`);
  };

  return {
    handlePageChange
  };
};
