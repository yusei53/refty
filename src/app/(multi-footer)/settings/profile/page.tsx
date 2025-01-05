import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import UpdateProfileSettingsPage from "./page.client";
import { profileAPI } from "@/src/api/profile-api";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.username) {
    return notFound();
  }
  const profile = await profileAPI.getUserProfile(session.user.username);
  if (profile === 404) {
    return notFound();
  }

  return (
    <UpdateProfileSettingsPage
      image={profile.image}
      username={session.user.username}
      bio={profile.bio}
      goal={profile.goal}
      website={profile.website}
    />
  );
};

export default page;
