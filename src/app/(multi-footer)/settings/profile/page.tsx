import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateProfileSettingsPage from "./page.client";
import { profileAPI } from "@/src/app/_client/api/profile-api";
import { meta } from "@/src/app/_client/utils/metadata";
import { getUserSession } from "@/src/app/_shared/get-user-session";

export const metadata: Metadata = meta.settingProfilePage;

const page = async () => {
  // TODO: api側で404を返す
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
