import Welcome from "@/components/creator/Welcome";
import TaskForm from "@/components/creator/TaskForm";
import { redirect } from "next/navigation";
import { getTasks, getCreatorProfile } from "@/api";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CreatorProfileDocument } from "@/utils/lib";

async function Creator() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const profile =
    user && ((await getCreatorProfile(user.id)) as CreatorProfileDocument[]);
  const tasks = user && (await getTasks(user?.id));

  if (!user) {
    redirect("/api/auth/login?post_login_redirect_url=/creator/create-task");
  }

  if (profile?.length === 0) {
    redirect("/creator/profile?callbackUrl=/creator/create-task");
  }

  if (tasks.length === 0) {
    return (
      <section className="w-[1200px] min-h-[calc(100vh-64px)] pt-16 max-w-full lg:pt-8 px-4 pb-5 flex items-center m-auto">
        <Welcome />
      </section>
    );
  }

  return (
    <section className="w-[1400px] pt-16 max-w-full lg:pt-8 px-4 pb-5 flex items-center m-auto">
      <TaskForm />
    </section>
  );
}

export default Creator;
