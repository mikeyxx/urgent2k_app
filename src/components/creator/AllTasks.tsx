import { ProposalProps, TaskDetailsProps } from "@/utils/lib";
import React from "react";
import Link from "next/link";
import { getReceivedProposals } from "@/api";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface AllTaskProps {
  task: TaskDetailsProps;
}

async function AllTasks({ task }: AllTaskProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const receivedProposal =
    user && ((await getReceivedProposals(task._id)) as ProposalProps[]);

  return (
    <div className="border-2 mt-10 rounded-xl mb-7">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-5 gap-4">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-5">
          <div key={task._id}>
            <div>
              <h4 className="font-semibold mb-2">{task.title}</h4>
              <p className="text-sm">{task.description}</p>
            </div>
            <small className="text-gray-400">{`Posted on ${new Date(
              task.createdAt
            )} by you`}</small>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <span className="text-primary bg-gray-100 p-1 h-8 w-8 rounded-full text-center inline-block">
                {task && task._id && receivedProposal?.length}
              </span>
              <p className="text-gray-400">Proposals</p>
            </div>
            <div>
              <span className="text-primary bg-gray-100 p-1 h-8 w-8 rounded-full text-center inline-block">
                {task.messaged.length}
              </span>
              <p className="text-gray-400">Messaged</p>
            </div>
            <div>
              <span className="text-primary bg-gray-100 p-1 h-8 w-8 rounded-full text-center inline-block">
                {task.hired.length}
              </span>
              <p className="text-gray-400">Hired</p>
            </div>
          </div>
        </div>

        <Link href={`/creator/${task._id}/applicants`}>
          <button className="bg-primary py-1 px-3 text-white rounded-xl text-sm">
            View Proposals
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AllTasks;
