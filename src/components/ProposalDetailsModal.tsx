"use client";

import TaskItemSkeleton from "@/utils/TaskItemSkeleton";
import { ProposalProps, TaskDetailsProps } from "@/utils/lib";
import React, { useState, useEffect } from "react";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { IoIosArrowForward, IoMdClock } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { HiOutlineBadgeCheck, HiOutlineClock } from "react-icons/hi";
import { AiFillTag } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

interface ProposalDetailsModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskID: string | null;
  singleProposal: ProposalProps | null;
}

function ProposalDetailsModal({
  open,
  setOpen,
  taskID,
  singleProposal,
}: ProposalDetailsModal) {
  const [task, setTask] = useState<TaskDetailsProps[] | null>(null);
  const { data: session } = useSession();

  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch(`/api/create-task/${taskID}/apply`);

      const data = await res.json();

      setTask(data);
    };

    getTasks();
  }, [taskID]);

  async function deleteProposal() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/proposal/getSingleProposal/?taskId=${taskID}&executorId=${session?.user.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        closeModal();
        toast.success("Proposal deleted!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function receiving(value: number) {
    const valueToReceive = (value - 0.07 * value).toLocaleString();

    return valueToReceive;
  }

  return (
    <>
      <div
        id="wrapper"
        className={`fixed inset-0 ${
          !open && "hidden"
        } bg-black/50 w-full h-full`}
      ></div>
      <div
        className={`fixed right-0 top-0 bg-white lg:rounded-l-xl h-full flex flex-col z-50 w-0 ${
          open && "w-[100%] lg:w-[60%]"
        } transition-all duration-300 overflow-scroll`}
      >
        <div className="py-8 px-6">
          <IoIosArrowForward
            className="cursor-pointer text-3xl ml-[-10px] font-bold"
            onClick={closeModal}
          />

          <h3 className="font-semibold text-xl mt-8 mb-16">Task Details</h3>

          {task?.map((singletask) => (
            <div
              key={singletask._id}
              className="flex lg:flex-row flex-col gap-5"
            >
              <div className="mt-8 pr-5">
                <h4>{singletask?.title}</h4>

                <div className="flex gap-10 mt-5">
                  <small className="bg-gray-200 rounded-lg px-7">
                    {singletask.category}
                  </small>
                  <small>
                    Posted {new Date(singletask.createdAt).toDateString()}
                  </small>
                </div>

                <p className="mt-5 text-sm">{singletask.description}</p>
              </div>

              <div className="lg:border-l pl-5 min-w-[200px]">
                {singletask.pricing === "Fixed rate" ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <AiFillTag className="text-sm" />
                      <div>
                        <p className="text-sm">
                          ₦{parseInt(singletask?.budget).toLocaleString()}
                        </p>
                        <small>Budget</small>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-sm" />
                      <div>
                        <p className="text-sm">{singletask?.experience}</p>
                        <small>Experience Level</small>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <IoMdClock className="text-sm" />

                      <div>
                        <p className="text-sm">{singletask.pricing}</p>
                        <small>Pricing</small>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BsCalendarDateFill className="text-sm" />

                      <div>
                        <p className="text-sm">{singletask.duration}</p>
                        <small>Duration</small>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <HiOutlineClock className="text-sm" />
                      <div>
                        <p className="text-sm">₦{singletask.payRate}</p>
                        <small>Pay rate</small>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <BsCalendarDateFill className="text-sm" />
                      <div>
                        <p className="text-sm">{singletask.duration}</p>
                        <small className="text-gray-500">Duration</small>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-sm" />
                      <div>
                        <p className="text-sm">{singletask.experience}</p>
                        <small>Experience Level</small>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <IoMdClock className="text-sm" />
                      <div>
                        <p className="text-sm">{singletask?.pricing}</p>
                        <small>Pricing</small>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <PiSuitcaseSimpleLight className="text-sm" />
                      <div>
                        <p className="text-sm">{singletask?.timeRequirement}</p>
                        <small>Required hours</small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="border-t mt-7">
            <h4 className="mt-5">Skills and Expertise</h4>

            <div className="flex gap-10 mt-5">
              {task?.map((taskSkill) => {
                return taskSkill.skills.map((skill, index) => (
                  <small
                    key={index}
                    className="text-sm bg-gray-200 rounded-lg px-7"
                  >
                    {skill}
                  </small>
                ));
              })}
            </div>
          </div>

          <div>
            <div className="border-t mt-7">
              <h3 className="mt-5">Your proposed terms</h3>

              {singleProposal?.hourlyRate ? (
                <div className="mt-5">
                  <h4>Hourly rate</h4>
                  <p className="text-sm">
                    The total amount the client will see on your proposal
                  </p>
                  <small className="text-sm text-primary">
                    ₦{singleProposal?.hourlyRate}
                  </small>
                </div>
              ) : (
                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h4>Fixed rate</h4>
                    <HiOutlineBadgeCheck className="text-primary" />
                  </div>
                  <p className="text-sm">Total price of project:</p>
                  <small className="text-sm text-primary">
                    ₦{Number(singleProposal?.fixedRate).toLocaleString()}
                  </small>
                </div>
              )}
            </div>

            <div className="border-t mt-7">
              <h3 className="my-5">You will receive:</h3>
              <p className="text-sm">
                The estimated amount you&apos;ll receive after deduction of
                service charge.
              </p>

              <small className="text-sm text-primary">
                ₦
                {singleProposal?.hourlyRate
                  ? receiving(Number(singleProposal?.hourlyRate))
                  : receiving(Number(singleProposal?.fixedRate))}
              </small>
            </div>
            <div className="border rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold mb-3">Cover letter</h3>

              <p>{singleProposal?.coverLetter}</p>
            </div>
          </div>

          <button
            onClick={deleteProposal}
            className="mt-6 border rounded-lg px-4 py-1 font-roboto bg-primary text-white"
          >
            Withdraw proposal
          </button>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default ProposalDetailsModal;
