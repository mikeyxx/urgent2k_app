import Proposal from "@/components/Proposal";
import { TaskDetailsProps } from "@/utils/lib";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ExecutorProfileDocument } from "@/utils/lib";
import { getSingleProposal } from "@/api";
import { redirect } from "next/navigation";

async function getSingleTask(id: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/create-task/${id}/apply`
    );

    if (!res.ok) {
      if (res.status === 404) {
        console.warn("Task was not found in the database");
        return null;
      } else {
        console.error(`Failed to fetch task: ${res.status}`);

        return null;
      }
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getExecutorProfile(id: string | undefined) {
  try {
    const res = await fetch(`http://localhost:3000/api/executorProfile/${id}`);

    if (!res.ok) {
      if (res.status === 404) {
        console.warn("User profile not found in the database");
        return null;
      } else {
        console.error(`Failed to fetch user data: ${res.status}`);

        return null;
      }
    }
    return res.json();
  } catch (error) {
    console.error(error);

    return null;
  }
}

async function Page({
  searchParams,
}: {
  searchParams: { taskId: string; executorId: string };
}) {
  const { taskId, executorId } = searchParams;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const singleTask: TaskDetailsProps[] = user && (await getSingleTask(taskId));

  const isProposalSent = user && (await getSingleProposal(taskId, executorId));

  const executor: ExecutorProfileDocument =
    user && (await getExecutorProfile(user?.id));

  if (!executor) {
    redirect("/executor/profile/create");
  }

  return (
    <section className="min-h-[calc(100vh-64px)] pt-8 pb-6 w-full max-w-[1100px] m-auto px-6 lg:px-0">
      {singleTask.map((task) => (
        <Proposal
          key={task._id}
          task={task}
          rate={executor?.rate}
          isProposalSent={isProposalSent}
        />
      ))}
    </section>
  );
}

export default Page;
