import { useSession } from "next-auth/react";
import { SettingUsernameModal } from "./SettingUsernameModal";
import { useUpdateUsernameForm } from "@/src/hooks/username/useUpdateUsernameForm";

type SettingUsernameModalContainerProps = {
  open: boolean;
};

const SettingUsernameModalContainer: React.FC<
  SettingUsernameModalContainerProps
> = ({ open }) => {
  const { update } = useSession();
  const { control, isSubmitting, isSubmitSuccessful, errors, onSubmit } =
    useUpdateUsernameForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
    await update();
  };

  return (
    <SettingUsernameModal
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
