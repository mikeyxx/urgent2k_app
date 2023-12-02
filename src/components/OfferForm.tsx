"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ExecutorProfileDocument,
  ProposalProps,
  TaskDetailsProps,
} from "@/utils/lib";

function OfferForm() {
  const [milestones, setMilestones] = useState<any>([]);
  const [proposal, setProposal] = useState<ProposalProps | null>(null);
  const [task, setTask] = useState<TaskDetailsProps | null>(null);
  const [executorProfile, setExecutorProfile] =
    useState<ExecutorProfileDocument | null>(null);
  const params = useParams();
  let percent = 100;

  useEffect(() => {
    const fetchProposal = async () => {
      const res = await fetch(`/api/proposal/${params.id}`);
      if (!res.ok) {
        if (res.status === 404) {
          console.warn("User profile not found in the database");
          return null;
        } else {
          console.error(`Failed to fetch user data: ${res.status}`);

          return null;
        }
      }
      const data = await res.json();
      setProposal(data);
    };

    fetchProposal();
  }, [params.id]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/executorProfile/${proposal?.executorId}`);
      if (!res.ok) {
        if (res.status === 404) {
          console.warn("User profile not found in the database");
          return null;
        } else {
          console.error(`Failed to fetch user data: ${res.status}`);

          return null;
        }
      }
      const data = await res.json();
      setExecutorProfile(data);
    };

    fetchProfile();
  }, [proposal?._id, proposal?.executorId]);

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`/api/getTask/${proposal?.taskId}/singleTask`);
      if (!res.ok) {
        if (res.status === 404) {
          console.warn("User profile not found in the database");
          return null;
        } else {
          console.error(`Failed to fetch user data: ${res.status}`);

          return null;
        }
      }
      const data = await res.json();
      setTask(data);
    };

    fetchTask();
  }, [proposal?._id, proposal?.taskId]);

  console.log(task);

  const [milestoneFormData, setMilestoneFormData] = useState({
    description: "",
    percentage: "",
    timeRequirement: "",
  });

  const handleMilestoneChange = (e: any) => {
    setMilestoneFormData({
      ...milestoneFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMilestone = () => {
    const totalMilestones = milestones.length + 1;
    const defaultPercentage = percent / totalMilestones;

    // Adjust existing milestones' percentages
    const updatedMilestones = milestones.map((milestone: any) => ({
      ...milestone,
      percentage: defaultPercentage.toFixed(2),
    }));

    setMilestones([
      ...updatedMilestones,
      {
        ...milestoneFormData,
        percentage: defaultPercentage.toFixed(2),
      },
    ]);

    setMilestoneFormData({
      description: "",
      percentage: "",
      timeRequirement: "",
    });
  };

  const handlePercentageChange = (index: number, newPercentage: string) => {
    const updatedMilestones = [...milestones];
    const oldPercentage = parseFloat(updatedMilestones[index].percentage);
    const diff = parseFloat(newPercentage) - oldPercentage;

    // Check if the input is empty
    const isEmptyInput = newPercentage.trim() === "";

    // If the input is not empty, update the percentage and adjust other milestones
    if (!isEmptyInput) {
      updatedMilestones[index].percentage = newPercentage;

      // Adjust other milestones
      const remainingMilestones = updatedMilestones.length - 1;
      const equalPercentage = diff / remainingMilestones;

      for (let i = 0; i < updatedMilestones.length; i++) {
        if (i !== index) {
          updatedMilestones[i].percentage = (
            parseFloat(updatedMilestones[i].percentage) - equalPercentage
          ).toFixed(2);
        }
      }
    } else {
      // If the input is empty, set the percentage to 0 or some default value
      updatedMilestones[index].percentage = "0.00"; // You can set it to another default value if needed
    }

    setMilestones(updatedMilestones);
  };

  return (
    <div className="mx-auto p-4 flex flex-col">
      <div className="place-self-end">
        <h3 className="font-bold text-xl">Offer</h3>
        <p>
          Task ID: <small>63f9468cfb67cb267531b80f</small>
        </p>
      </div>
      {/* Task Details Section */}
      <div className="border p-2 rounded-lg mt-4">
        <h2 className="text-2xl font-semibold mb-4">Task Details</h2>

        <p>{task?.description}</p>
      </div>
      <div className="flex items-center justify-between w-full mt-8">
        <div className="flex flex-col gap-10">
          {/* Project Milestones Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Project Milestones</h2>
            <div className="mb-4 flex items-center gap-4">
              <input
                type="text"
                name="description"
                value={milestoneFormData.description}
                onChange={handleMilestoneChange}
                placeholder="Milestone Description"
                className="border p-2 rounded-lg"
              />

              <input
                type="text"
                name="timeRequirement"
                value={milestoneFormData.timeRequirement}
                onChange={handleMilestoneChange}
                placeholder="Time Requirement per day"
                className="border p-2 rounded-lg"
              />
              <button
                onClick={handleAddMilestone}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Milestone
              </button>
            </div>
            {/* Render milestone list here */}
            {milestones.map((milestone: any, index: any) => (
              <div
                key={index}
                className="mb-4 w-full flex items-center justify-between gap-4"
              >
                <div className="w-[200px] flex flex-wrap overflow-clip p-2">
                  <p className="">{milestone.description}</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={milestone.percentage}
                    onChange={(e) =>
                      handlePercentageChange(index, e.target.value)
                    }
                    placeholder="Percentage"
                    className="border p-2 rounded-lg"
                  />
                  <span>%</span>
                </div>
                <span>{milestone.timeRequirement}</span>
              </div>
            ))}
          </div>

          <div className="">
            {/* Render milestone list here */}
            <p>Milestone list here</p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="place-self-start">
            {/* Freelancer Profile Section */}

            <div className="border p-2 rounded-lg w-[400px]">
              <h2 className="text-lg font-semibold mb-4">Executor Profile</h2>
              <p>{executorProfile?.bio}</p>
            </div>
          </div>
          {/* Other Project Details Section */}
          <div className="border p-2 rounded-lg">
            {/* Render other project details inputs here */}
            <h3>Other project details</h3>

            <p>
              Pricing:{" "}
              <span>{proposal?.hourlyRate ? "Hourly rate" : "Fixed rate"}</span>
            </p>
            <p>
              Rate:{" "}
              <span>
                ₦
                {proposal?.hourlyRate
                  ? proposal?.hourlyRate
                  : proposal?.fixedRate}
                /hr
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Send Offer Button */}
      <div className="mt-8 place-self-center">
        <button className="bg-green-500 text-white p-2 rounded">
          Send Offer
        </button>
      </div>
    </div>
  );
}

export default OfferForm;
