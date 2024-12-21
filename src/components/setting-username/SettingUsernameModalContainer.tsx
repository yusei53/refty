import type { User } from "@prisma/client";
import UsernameModal from "../setting-username/SettingUsernameModal";
import { useUpdateUsernameForm } from "@/src/hooks/username/useUpdateUsernameForm";

type SettingUsernameModalContainerProps = {
  open: boolean;
  currentUsername: User["username"];
};

const SettingUsernameModalContainer: React.FC<
  SettingUsernameModalContainerProps
> = ({ open, currentUsername }) => {
  const { control, isSubmitting, isSubmitSuccessful, errors, onSubmit } =
    useUpdateUsernameForm(currentUsername);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
  };

  return (
    <UsernameModal
      onSubmit={handleSubmit}
      control={control}
      errors={errors}
      open={open}
      isSubmitting={isSubmitting}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default SettingUsernameModalContainer;
