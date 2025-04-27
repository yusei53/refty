import { useRouter } from "next/navigation";
import { userReportAPI } from "@/src/app/_client/api/user-report-api";

type UseUpdateIsReportOpenProps = {
  username: string;
  isReportOpen: boolean;
};

export const useUpdateIsReportOpen = ({
  username,
  isReportOpen
}: UseUpdateIsReportOpenProps) => {
  const router = useRouter();

  const handleUpdateIsReportOpen = async () => {
    const result = await userReportAPI.updateIsReportOpen(
      username,
      !isReportOpen
    );
    if (result === 404) {
      router.push(`/login`);
    } else {
      router.refresh();
    }
  };

  return { handleUpdateIsReportOpen };
};
