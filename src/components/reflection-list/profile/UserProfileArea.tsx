import { ReflectionsCount } from "@/src/api/reflections-count-api";
import dynamic from "next/dynamic";
import { LinearLoading } from "../../ui/shared/loading";
import { UserAvatar } from "./avatar";

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
  reflectionCount: ReflectionsCount;
};

const UserProfileArea: React.FC<UserProfileAreaProps> = ({
  userImage,
  username,
  reflectionCount
}) => {
  return (
    <>
      <UserAvatar userImage={userImage} username={username} />
      <CalendarAreaFetcher reflectionCount={reflectionCount} />
    </>
  );
};

export default UserProfileArea;
