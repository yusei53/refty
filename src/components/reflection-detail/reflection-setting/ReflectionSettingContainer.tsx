import ReflectionSetting from "./ReflectionSetting";
import { useUpdatePinnedReflection } from "@/src/hooks/reflection/useUpdatePinnedReflection";
import { useUpdatePublicReflection } from "@/src/hooks/reflection/useUpdatePublicReflection";

type ReflectionSettingContainerProps = {
  username: string;
  reflectionCUID: string;
  isCurrentUser: boolean;
  isPublic: boolean;
  isPinned: boolean;
};

const ReflectionSettingContainer: React.FC<ReflectionSettingContainerProps> = ({
  username,
  reflectionCUID,
  isCurrentUser,
  isPublic,
  isPinned
}) => {
  const handleCopyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_API_URL}/${username}/${reflectionCUID}`;
    navigator.clipboard.writeText(link);
  };

  const { handleUpdatePublic } = useUpdatePublicReflection({
    reflectionCUID,
    isPublic
  });

  const { handleUpdatePinned } = useUpdatePinnedReflection({
    reflectionCUID,
    isPinned
  });

  return (
    <ReflectionSetting
      username={username}
      reflectionCUID={reflectionCUID}
      isCurrentUser={isCurrentUser}
      isPublic={isPublic}
      isPinned={isPinned}
      onUpdatePublic={handleUpdatePublic}
      onUpdatePinned={handleUpdatePinned}
      onCopyLink={handleCopyLink}
    />
  );
};

export default ReflectionSettingContainer;
