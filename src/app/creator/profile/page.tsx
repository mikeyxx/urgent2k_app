import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import Profile from "@/components/creator/Profile";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/?callbackUrl=creator/profile");
  }

  if (session.user.role !== "creator") {
    redirect("/");
  }

  return (
    <section className="min-h-screen pt-8 pb-6 w-full max-w-[1200px] m-auto px-6 lg:px-0">
      <Profile />
    </section>
  );
}

export default Page;
