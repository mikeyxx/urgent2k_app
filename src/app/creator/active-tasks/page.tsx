import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTasks } from "@/api";
import AllTasks from "@/components/creator/AllTasks";
import { TaskDetailsProps } from "@/utils/lib";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const tasks = user && ((await getTasks(user?.id)) as TaskDetailsProps[]);

  if (!user) {
    redirect("/api/auth/login?post_login_redirect_url=/creator/all-tasks");
  }

  if (tasks?.length === 0) {
    redirect("/creator/create-task");
  }

  return (
    <div className="w-[1100px] pt-8 max-w-full min-h-[calc(100vh-64px)] px-4 pb-5 m-auto">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xl font-bold">All task</h3>
        <Link
          href="/creator/create-task"
          className="bg-primary rounded-2xl text-white py-1 px-6"
        >
          Post a new task
        </Link>
      </div>
      {tasks?.map((task) => (
        <AllTasks key={task._id} task={task} />
      ))}
    </div>
  );
}

export default Page;
