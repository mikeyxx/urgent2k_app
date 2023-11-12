import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import Profile from "@/components/executor/Profile";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/?callbackUrl=/executor/profile");
  }

  if (session.user.role !== "executor") {
    redirect("/");
  }

  return (
    <section className="min-h-screen pt-8 pb-6 w-full max-w-[1200px] m-auto px-6 lg:px-0">
      <Profile />
    </section>
  );
}

export default Page;
