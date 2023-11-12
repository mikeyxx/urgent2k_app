"use client";

import { ConversationProps, useChatContext } from "@/context/ChatContext";
import ExecutorProfileSkeleton from "@/utils/ExecutorProfileSkeleton";
import { ExecutorProfileDocument } from "@/utils/executor";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { IoIosArrowForward, IoMdAdd } from "react-icons/io";
import {
  MdAddCircleOutline,
  MdLocationPin,
  MdModeEditOutline,
} from "react-icons/md";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSession } from "next-auth/react";

interface ActiveProposalExecutorProfileProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  executorId: string | null;
}

function ActiveProposalExecutorProfile({
  open,
  setOpen,
  executorId,
}: ActiveProposalExecutorProfileProps) {
  const [profileData, setProfileData] =
    useState<ExecutorProfileDocument | null>(null);
  const { data: session } = useSession();
  // const { startConversation } = useChatContext();

  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const getExecutor = async () => {
      const res = await fetch(`/api/getProfileInfo/${executorId}`);

      const data = await res.json();

      setProfileData(data);
    };

    getExecutor();
  }, [executorId]);

  if (profileData === null) {
    return (
      <>
        <div
          id="wrapper"
          className={`fixed inset-0 ${
            !open && "hidden"
          } bg-black/50 w-full h-full`}
        ></div>
        <ExecutorProfileSkeleton open={open} setOpen={setOpen} />;
      </>
    );
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
            className="cursor-pointer text-3xl ml-[-10px] mb-5 font-bold"
            onClick={closeModal}
          />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-[300px] w-full border rounded-xl flex-center flex-col p-6 gap-3 place-self-start">
              <div className="border-b-2 w-full flex-center flex-col gap-3 pb-3">
                <Image
                  src={profileData.image ?? ""}
                  alt="profile picture"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div className="flex items-center mt-3 gap-3">
                  <p>{profileData.name}</p>

                  <div className="flex items-center lg:text-sm">
                    <AiOutlineStar />
                    <span>5.0</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 lg:text-sm">
                  <PiSuitcaseSimpleLight className="text-primary" />
                  <p>Completed 0 task</p>
                </div>

                <div className="flex items-center lg:text-sm">
                  <MdLocationPin className="text-primary" />

                  {profileData && (
                    <address>
                      {profileData?.address?.city},{" "}
                      {profileData?.address?.country}
                    </address>
                  )}
                </div>
              </div>

              <div className="border-b-2 w-full text-center pb-3 mt-8">
                <h4>Verification Status</h4>
                <p>
                  ID: <span className="text-primary lg:text-sm">Verified</span>
                </p>
              </div>
              <div className="border-b-2 w-full text-center pb-3 mt-8">
                <h4>Your rate per hour</h4>
                <small className="text-primary">₦{profileData.rate}</small>
              </div>

              <div className="mt-8 w-full border-b-2 pb-3">
                <div className="flex items-center gap-5">
                  <MdAddCircleOutline className="text-primary" />
                  <h4>Education</h4>
                </div>
                <div className="flex items-center w-full justify-between lg:text-sm">
                  <div className="mt-4">
                    <h5>{profileData?.education?.school}</h5>
                    <p>{profileData?.education?.degree}</p>
                    <small>
                      {profileData?.education.start} -{" "}
                      {profileData?.education.end}
                    </small>
                  </div>

                  <div className="flex gap-3">
                    <button className="h-fit w-fit p-1 rounded-full border border-primary">
                      <MdModeEditOutline />
                    </button>
                    <button className="h-fit w-fit p-1 rounded-full border border-primary">
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="bg-primary text-white px-4 py-1 rounded-lg shadow-md text-center"
                // onClick={() =>
                //   startConversation(session?.user.id, profileData._id)
                // }
              >
                Chat with executor
              </button>
            </div>

            <div className="border flex-1 rounded-xl p-6 place-self-start">
              <div className="border-b-2 pb-3">
                <h4 className="font-bold text-2xl mb-6">{profileData.title}</h4>
                <p className="text-gray-500">{profileData.bio}</p>
              </div>

              <div className="border-b-2 pb-3 mt-8 w-full">
                <div className="flex items-center justify-center gap-2">
                  <h4 className="text-center">Skills</h4>
                  <button className="h-fit w-fit p-1 rounded-full border border-primary">
                    <MdModeEditOutline />
                  </button>
                </div>
                <small>{profileData.skills}</small>
              </div>

              <div className="border-b-2 pb-3 mt-8 w-full">
                <div className="flex items-center justify-center gap-2">
                  <h4 className="text-center">Portfolio</h4>
                  <button className="h-fit w-fit p-1 rounded-full border border-primary">
                    <IoMdAdd />
                  </button>
                </div>
              </div>

              <div className="flex flex-col border-b-2 pb-3 mt-8 w-full">
                <div className="flex justify-between items-center">
                  <h4 className="mb-6 text-center">Employment History</h4>
                  <button>
                    <IoMdAdd />
                  </button>
                </div>

                {profileData.experiences.map((exp, index) => (
                  <div className="lg:text-sm" key={index}>
                    <h4>{exp?.jobTitle}</h4>
                    <p>{exp?.company}</p>
                    <p>
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p>{exp.location}</p>
                  </div>
                ))}
              </div>
              <div className="border-b-2 pb-3 mt-8 w-full flex justify-between items-center">
                <h4 className="mb-6 text-center">Certifications</h4>
                <button>
                  <IoMdAdd />
                </button>
              </div>
              <div className="mt-8 w-full flex justify-between items-center">
                <h4 className="mb-6 text-center">Portfolio</h4>
                <button>
                  <IoMdAdd />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActiveProposalExecutorProfile;
