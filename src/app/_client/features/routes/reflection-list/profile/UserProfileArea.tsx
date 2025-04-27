import dynamic from "next/dynamic";
import type { ReflectionsCount } from "@/src/app/_client/api/reflections-count-api";
import { UserInformationHeader } from "./header";
import ToReportPageLink from "./to-report-link/ToReportPageLink";
import { LinearLoading } from "@/src/app/_client/components/loading";

const CalendarAreaFetcher = dynamic(
  () => import("./calendar").then((mod) => mod.CalendarAreaFetcher),
  {
    loading: () => <LinearLoading />,
    ssr: false
  }
);

type UserProfileAreaProps = {
  userImage: string;
  username: string;
  bio: string;
  website: string;
  reflectionCount: ReflectionsCount;
  isCurrentUser: boolean;
};

const UserProfileArea: React.FC<UserProfileAreaProps> = ({
  userImage,
  username,
  bio,
  website,
  reflectionCount,
  isCurrentUser
}) => {
  return (
    <>
      <UserInformationHeader
        userImage={userImage}
        username={username}
        bio={bio}
        website={website}
        isCurrentUser={isCurrentUser}
      />
      <CalendarAreaFetcher reflectionCount={reflectionCount} />
      <ToReportPageLink username={username} />
    </>
  );
};

export default UserProfileArea;
