"use client";

import React, { useState } from "react";
import { IoMdClock } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";
import { AiFillTag } from "react-icons/ai";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import Link from "next/link";
import { TaskDetailsProps } from "@/utils/lib";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { TbDragDrop } from "react-icons/tb";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface ProposalProps {
  task: TaskDetailsProps;
  rate: number;
  isProposalSent: TaskDetailsProps[];
}

function Proposal({ task, rate, isProposalSent }: ProposalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useKindeBrowserClient();
  const [proposalState, setProposalState] = useState({
    hourlyRate: task.budget ? "" : rate,
    fixedRate: task.budget,
    coverLetter: "",
    attachment: "",
  });

  const handleStateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setProposalState({
      ...proposalState,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const attachment = reader.result as string;
      setProposalState({ ...proposalState, attachment });
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        body: JSON.stringify({
          hourlyRate: proposalState.hourlyRate,
          fixedRate: proposalState.fixedRate,
          coverLetter: proposalState.coverLetter,
          attachment: proposalState.attachment,
          taskId: task._id,
          executorId: user?.id,
          isAccepted: false,
        }),
      });

      toast.success("Proposal submitted!");

      if (res.ok) {
        router.push("/executor/dashboard/active-proposal");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hourlyRate_serviceCharge = (
    0.07 * Number(proposalState.hourlyRate)
  ).toLocaleString();

  const fixedRate_serviceCharge = (
    0.07 * parseInt(proposalState.fixedRate)
  ).toLocaleString();

  const hourlyRate_valueToReceive = (
    Number(proposalState.hourlyRate) -
    0.07 * Number(proposalState.hourlyRate)
  ).toLocaleString();

  const fixedRate_valueToReceive = (
    parseInt(proposalState.fixedRate) -
    0.07 * parseInt(proposalState.fixedRate)
  ).toLocaleString();

  return (
    <>
      <div className="border rounded-lg p-6">
        {isProposalSent.length === 0 ? (
          <h3 className="text-xl">Task Details</h3>
        ) : (
          <div className="flex gap-7">
            <h3 className="text-xl">Task Details</h3>
            <p className="text-primary bg-blue-100 px-2 py-1 rounded-lg text-sm">
              You&apos;ve already submitted a proposal!
            </p>
          </div>
        )}

        <div className="flex lg:flex-row flex-col gap-5">
          <div className="mt-12 pr-5">
            <h4>{task.title}</h4>

            <div className="flex gap-5 mt-5 items-center">
              {task.categories.map((t, index) => (
                <small key={index} className="bg-gray-200 rounded-lg px-4">
                  {t}
                </small>
              ))}
              <small>Posted {new Date(task.createdAt).toDateString()}</small>
            </div>

            <p className="mt-5 text-sm">{task.description}</p>
          </div>

          <div className="lg:border-l pl-5 min-w-[200px]">
            {task.pricing === "Fixed rate" ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <AiFillTag className="text-sm" />
                  <div>
                    <p className="text-sm">
                      ₦{parseInt(task?.budget).toLocaleString()}
                    </p>
                    <small>Budget</small>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaUserTie className="text-sm" />
                  <div>
                    <p className="text-sm">{task?.experience}</p>
                    <small>Experience Level</small>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <IoMdClock className="text-sm" />

                  <div>
                    <p className="text-sm">{task.pricing}</p>
                    <small>Pricing</small>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BsCalendarDateFill className="text-sm" />

                  <div>
                    <p className="text-sm">{task.duration}</p>
                    <small>Duration</small>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="text-sm" />
                  <div>
                    <p className="text-sm">₦{task.payRate}</p>
                    <small>Pay rate</small>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <BsCalendarDateFill className="text-sm" />
                  <div>
                    <p className="text-sm">{task.duration}</p>
                    <small className="text-gray-500">Duration</small>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaUserTie className="text-sm" />
                  <div>
                    <p className="text-sm">{task.experience}</p>
                    <small>Experience Level</small>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <IoMdClock className="text-sm" />
                  <div>
                    <p className="text-sm">{task?.pricing}</p>
                    <small>Pricing</small>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <PiSuitcaseSimpleLight className="text-sm" />
                  <div>
                    <p className="text-sm">{task?.timeRequirement}</p>
                    <small>Required hours</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t mt-7">
          <h4 className="mt-5">Skills and Expertise</h4>

          <div className="flex gap-10 mt-5">
            {task.skills.map((skill, index) => (
              <small
                key={index}
                className="text-sm bg-gray-200 rounded-lg px-7"
              >
                {skill}
              </small>
            ))}
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-6 mt-8">
        <h3 className="text-xl">Terms</h3>
        {task.pricing === "Hourly" ? (
          <div
            key={task._id}
            className="mt-12 flex flex-col gap-7 lg:w-[800px]"
          >
            <h5>What rate would you like to bid for this job?</h5>

            <div className="flex flex-col lg:flex-row items-center justify-between w-full">
              <span className="lg:text-xs">
                Your profile rate:{" "}
                <small className="bg-gray-200 lg:text-xs px-3 py-1 rounded-md">
                  ₦{rate}/hr
                </small>
              </span>
              <span className="lg:text-xs">
                Client budget:{" "}
                <small className="bg-gray-200 lg:text-xs px-3 py-1 rounded-md">
                  ₦{task.payRate}/hr
                </small>
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between w-full border-b pb-5">
              <div>
                <p>Hourly rate</p>
                <small>
                  Total amount the creator will see on your proposal
                </small>
              </div>
              <div className="flex items-center">
                <input
                  name="hourlyRate"
                  type="number"
                  value={proposalState.hourlyRate}
                  onChange={handleStateChange}
                  className="border rounded-md text-sm py-1 px-2 focus:border-0 focus:outline-primary"
                />
                <span>/hr</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between w-full border-b pb-5">
              <p>7% executor service fee</p>
              <small className="bg-gray-200 lg:text-xs px-3 py-1 rounded-md">
                -₦
                {isNaN(parseInt(hourlyRate_serviceCharge))
                  ? 0
                  : hourlyRate_serviceCharge}
                /hr
              </small>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between w-full">
              <div>
                <p>You will receive</p>
                <small>
                  The estimated amount you&apos;ll receive after service charge
                </small>
              </div>
              <small className="bg-gray-200 lg:text-xs px-3 py-1 rounded-md">
                ₦
                {isNaN(parseInt(hourlyRate_valueToReceive))
                  ? 0
                  : hourlyRate_valueToReceive}
                /hr
              </small>
            </div>
          </div>
        ) : (
          <div className="mt-12 flex flex-col gap-7 lg:w-[800px]">
            <h5>What rate would you like to bid for this job?</h5>

            <div className="flex flex-col lg:flex-row items-center justify-between w-full border-b pb-5">
              <div>
                <p>Bid</p>
                <small>
                  Total amount the creator will see on your proposal
                </small>
              </div>
              <div className="flex items-center">
                <span>₦</span>
                <input
                  name="fixedRate"
                  type="text"
                  value={proposalState.fixedRate}
                  onChange={handleStateChange}
                  className="border rounded-md text-sm py-1 px-2 focus:border-0 focus:outline-primary"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between w-full border-b pb-5">
              <p>7% executor service fee</p>
              <small className="bg-gray-200 lg:text-xs px-3 py-1 rounded-md">
                -₦
                {isNaN(parseInt(fixedRate_serviceCharge))
                  ? 0
                  : fixedRate_serviceCharge}
              </small>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between w-full">
              <div>
                <p>You will receive</p>
                <small>
                  The estimated amount you&apos;ll receive after service charge
                </small>
              </div>
              <small className="bg-gray-200 lg:text-xs px-3 py-1 rounded-md">
                ₦
                {isNaN(parseInt(fixedRate_valueToReceive))
                  ? 0
                  : fixedRate_valueToReceive}
              </small>
            </div>
          </div>
        )}
      </div>

      {isProposalSent.length === 0 && (
        <div className="border rounded-lg p-6 mt-8">
          <h3 className="text-xl">Additional details</h3>

          <div className="mt-12 flex flex-col gap-7">
            <div className="flex flex-col">
              <label htmlFor="coverLetter">Cover letter</label>
              <textarea
                name="coverLetter"
                id="coverLetter"
                rows={6}
                value={proposalState.coverLetter}
                onChange={handleStateChange}
                placeholder="Describe your experience here if you have worked on a similar task previously"
                className="border rounded-md hover:border-primary transition-colors ease focus:border-0 focus:outline-primary p-2"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="attachment">
                <p>Attachment</p>
                <div className="border-2 rounded-md border-dashed transition-colors ease w-full flex items-center justify-center min-h-[100px] bg-gray-100 cursor-pointer hover:border-primary gap-2">
                  <TbDragDrop className="text-2xl" />
                  <span className="text-sm">
                    Drag or{" "}
                    <small className="underline text-primary text-sm">
                      Upload
                    </small>{" "}
                    files here
                  </span>
                </div>
              </label>
              <input
                id="attachment"
                name="attachment"
                type="file"
                value={proposalState.attachment}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col gap-5 mt-8 items-center">
            {loading ? (
              <button
                type="button"
                className="bg-gradient-to-r from-blue-500 to-primary text-white py-2 px-4 rounded-full transition-opacity duration-300 ease-in-out opacity-75 hover:opacity-100 cursor-not-allowed"
                disabled
              >
                Sending...
              </button>
            ) : (
              <button
                className="bg-primary px-3 py-2 rounded-md text-white"
                onClick={handleSubmit}
              >
                Submit your proposal
              </button>
            )}

            <Link href="/executor/feed" className="hover:text-primary">
              Cancel
            </Link>
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default Proposal;
