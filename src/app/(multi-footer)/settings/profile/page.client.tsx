"use client";
import SettingProfileFormField from "@/src/features/settings-profile/SettingProfileFormField";
import { useUpdateProfileForm } from "@/src/hooks/profile-setting/useUpdateProfileForm";

type UpdateProfileSettingsPageProps = {
  image: string;
  username: string;
  bio: string;
  goal: string;
  website: string;
};

const UpdateProfileSettingsPage: React.FC<UpdateProfileSettingsPageProps> = ({
  image,
  username,
  bio,
  goal,
  website
}) => {
  const { control, isSubmitting, isSubmitSuccessful, errors, onSubmit } =
    useUpdateProfileForm({
      username,
      bio,
      goal,
      website
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
  };

  return (
    <SettingProfileFormField
      image={image}
      username={username}
      control={control}
      isSubmitting={isSubmitting}
      isSubmitSuccessful={isSubmitSuccessful}
      errors={errors}
      onSubmit={handleSubmit}
    />
  );
};

export default UpdateProfileSettingsPage;
