"use client";

import React, { useState, useEffect } from "react";
import ProposalDetailsModal from "@/components/ProposalDetailsModal";
import { ProposalProps } from "@/utils/lib";
import { redirect } from "next/navigation";

function SubmittedProposal({ user }: { user: any }) {
  const [sentProposal, setSentProposal] = useState<ProposalProps[] | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [singleProposal, setSingleProposal] = useState<ProposalProps | null>(
    null
  );
  const [taskID, setTaskID] = useState<string | null>(null);

  useEffect(() => {
    const getProposal = async () => {
      const res = await fetch(`/api/proposal/${user?.id}`);
      const data = await res.json();

      setSentProposal(data);
    };

    getProposal();
  }, [user]);

  const handleSelected = (id: string) => {
    setOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling

    if (taskID === null) {
      setTaskID(id);
    } else if (taskID !== id) {
      setTaskID(id);
    }

    return sentProposal?.find((task: ProposalProps) =>
      task.taskId === id ? setSingleProposal(task) : ""
    );
  };

  if (!user) {
    redirect("/?callbackUrl=/executor/dashboard/submitted-proposal");
  }

  if (sentProposal?.length === 0) {
    return (
      <article className="min-h-[calc(100vh-64px)] pt-8 pb-6 w-full max-w-[1000px] m-auto px-6 lg:px-0">
        <h2>
          Submitted proposal{" "}
          <span className="text-primary">({sentProposal?.length ?? 0})</span>
        </h2>

        <p className="mt-8">
          Proposal you have submitted will be displayed here.
        </p>
      </article>
    );
  }

  return (
    <>
      <article className="min-h-[calc(100vh-64px)] pt-8 pb-6 w-full max-w-[1000px] m-auto px-6 lg:px-0">
        <h2>
          Submitted proposal{" "}
          <span className="text-primary">({sentProposal?.length ?? 0})</span>
        </h2>

        {sentProposal?.map((proposal) => (
          <div
            key={proposal.taskId}
            className="border mt-5 rounded-lg py-3 px-3"
          >
            <p>{proposal.coverLetter.substring(0, 300) + "..."}</p>
            <button
              className="border py-1 px-3 rounded-lg hover:bg-primary hover:text-white border-primary text-primary"
              onClick={() => handleSelected(proposal.taskId)}
            >
              More details
            </button>
          </div>
        ))}
      </article>

      <ProposalDetailsModal
        open={open}
        setOpen={setOpen}
        taskID={taskID}
        singleProposal={singleProposal}
      />
    </>
  );
}

export default SubmittedProposal;
