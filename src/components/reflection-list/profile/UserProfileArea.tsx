import { ReflectionsCount } from "@/src/api/reflections-count-api";
import { LinearLoading } from "../../shared/loading";
import { UserAvatar } from "./avatar";
import dynamic from "next/dynamic";

const CalendarAreaFetcher = dynamic(
  () => import("./calendar").then((mod) => mod.CalendarAreaFetcher),
  {
    loading: () => <LinearLoading />,
    ssr: false,
  }
);

type UserProfileAreaProps = {
  userImage: string;
  username: string;
  reflectionCount: ReflectionsCount;
};

const UserProfileArea: React.FC<UserProfileAreaProps> = ({
  userImage,
  username,
  reflectionCount,
}) => {
  return (
    <>
      <UserAvatar userImage={userImage} username={username} />
      <CalendarAreaFetcher reflectionCount={reflectionCount} />
    </>
  );
};

export default UserProfileArea;
