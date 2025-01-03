import dynamic from "next/dynamic";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
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
  bio: string;
  website: string;
  reflectionCount: ReflectionsCount;
};

const UserProfileArea: React.FC<UserProfileAreaProps> = ({
  userImage,
  username,
  bio,
  website,
  reflectionCount
}) => {
  return (
    <>
      <UserAvatar
        userImage={userImage}
        username={username}
        bio={bio}
        website={website}
      />
      <CalendarAreaFetcher reflectionCount={reflectionCount} />
    </>
  );
};

export default UserProfileArea;
