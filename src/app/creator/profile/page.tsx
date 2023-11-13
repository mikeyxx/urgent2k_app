import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";
import Profile from "@/components/creator/Profile";
import { getCreatorProfile, getDBUser } from "@/api";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = await getDBUser(user?.id);
  const profile = await getCreatorProfile(user?.id);

  if (!user && !dbUser.role) {
    redirect("/api/auth/login?post_login_redirect_url=/creator/profile");
  }

  if (!profile) {
    redirect("/creator/profile/create");
  }

  return (
    <section className="min-h-screen pt-8 pb-6 w-full max-w-[1200px] m-auto px-6 lg:px-0">
      <Profile user={user} />
    </section>
  );
}

export default Page;
