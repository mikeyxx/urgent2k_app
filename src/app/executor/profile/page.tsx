import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Profile from "@/components/executor/Profile";
import { getDBUser, getExecutorProfile } from "@/api";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = await getDBUser(user?.id);
  const profile = await getExecutorProfile(user?.id);

  if (!user && !dbUser.role) {
    redirect(
      "/api/auth/login?post_login_redirect_url=/executor/profile/create"
    );
  }

  if (!profile) {
    redirect("/executor/profile/create?callbackUrl=/executor/profile");
  }

  return (
    <section className="min-h-screen pt-8 pb-6 w-full max-w-[1200px] m-auto px-6 lg:px-0">
      <Profile />
    </section>
  );
}

export default Page;
