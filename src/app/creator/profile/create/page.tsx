import CreateProfile from "@/components/creator/CreateProfile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getExecutorProfile } from "@/api";
import ProfileCreatorWelcomePage from "@/components/creator/ProfileCreatorWelcomePage";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const profile = await getExecutorProfile(user?.id);

  if (!user) {
    redirect("/api/auth/login?callbackUrl=/creator/profile/create");
  }

  return (
    <section className="w-[1200px] min-h-[calc(100vh-64px)] pt-16 max-w-full lg:pt-8 px-4 pb-5 flex items-center m-auto">
      {profile ? <CreateProfile user={user} /> : <ProfileCreatorWelcomePage />}
    </section>
  );
}

export default Page;
