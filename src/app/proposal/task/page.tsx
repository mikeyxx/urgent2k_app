import Proposal from "@/components/Proposal";
import { TaskDetailsProps } from "@/utils/lib";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ExecutorProfileDocument } from "@/utils/lib";
import { getSingleProposal } from "@/api";

async function getSingleTask(id: string) {
  const res = await fetch(`http://localhost:3000/api/create-task/${id}/apply`);
  return res.json();
}

async function getExecutorProfile(id: string | undefined) {
  const res = await fetch(`http://localhost:3000/api/executorProfile/${id}`);
  return res.json();
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

  const rate: ExecutorProfileDocument[] =
    user && (await getExecutorProfile(user?.id));

  return (
    <section className="min-h-[calc(100vh-64px)] pt-8 pb-6 w-full max-w-[1100px] m-auto px-6 lg:px-0">
      {singleTask.map((task) => (
        <Proposal
          key={task._id}
          task={task}
          rate={rate?.[0].rate}
          isProposalSent={isProposalSent}
        />
      ))}
    </section>
  );
}

export default Page;
