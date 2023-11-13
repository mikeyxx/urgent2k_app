import CreateProfile from "@/components/creator/CreateProfile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login?callbackUrl=/creator/profile/create");
  }

  return (
    <section className="w-[1200px] min-h-[calc(100vh-64px)] pt-16 max-w-full lg:pt-8 px-4 pb-5 flex items-center m-auto">
      <CreateProfile user={user} />
    </section>
  );
}

export default Page;
