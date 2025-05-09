import { SettingUsernameModal } from "./SettingUsernameModal";
import { useUpdateUsernameForm } from "@/src/app/_client/hooks/username/useUpdateUsernameForm";

type SettingUsernameModalContainerProps = {
  open: boolean;
};

const SettingUsernameModalContainer: React.FC<
  SettingUsernameModalContainerProps
> = ({ open }) => {
  const { control, isSubmitting, isSubmitSuccessful, errors, onSubmit } =
    useUpdateUsernameForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
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
