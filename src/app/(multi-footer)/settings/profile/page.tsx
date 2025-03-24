import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateProfileSettingsPage from "./page.client";
import { profileAPI } from "@/src/api/profile-api";
import { getUserSession } from "@/src/utils/get-user-session";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.settingProfilePage;

const page = async () => {
  const session = await getUserSession();
  if (!session?.username) {
    return notFound();
  }
  const profile = await profileAPI.getUserProfile(session.username);
  if (profile === 404) {
    return notFound();
  }

  return (
    <UpdateProfileSettingsPage
      image={profile.image}
      username={session.username}
      bio={profile.bio}
      goal={profile.goal}
      website={profile.website}
    />
  );
};

export default page;
