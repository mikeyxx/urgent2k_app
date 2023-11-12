"use client";

import { TaskDetailsProps } from "@/utils/lib";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillTag } from "react-icons/ai";
import { IoMdClock } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import {
  BsCalendarDateFill,
  BsFillFileEarmarkPdfFill,
  BsFillFileEarmarkWordFill,
} from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";
import { format, formatDistance, parse } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExecutorProfileDocument } from "@/utils/executor";

interface TasksProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  singleTask: TaskDetailsProps | null;
}

function TaskDetails({ open, setOpen, singleTask }: TasksProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState<ExecutorProfileDocument | null>(null);
  const [creatorTaskInfo, setCreatorTaskInfo] = useState<
    TaskDetailsProps[] | null
  >(null);
  const router = useRouter();

  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/getProfileInfo/${singleTask?.creatorId}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [singleTask]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch(`/api/getTask/${singleTask?.creatorId}`);

        const data = await res.json();
        setCreatorTaskInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, [singleTask]);

  // const clickApply = (id: string | undefined) => {
  //   router.push(`/proposal/task/${id}/apply`);
  //   document.body.style.overflow = "auto"; // Re-enable scrolling
  // };

  const mDate = singleTask?.createdAt;
  const jsDate = mDate ? new Date(mDate) : null;
  const currentDate = new Date();

  const handleApplyButton = () => {
    document.body.style.overflow = "auto"; // Re-enable scrolling
    setOpen(false);
    router.push(
      `/proposal/task/?taskId=${singleTask?._id}&executorId=${session?.user.id}`
    );
  };

  const timeAgo =
    jsDate && formatDistance(jsDate, currentDate, { addSuffix: true });

  const getCurrentTimeWithAMPM = useMemo(() => {
    const currentTime = Date.now();
    const now = new Date(currentTime);
    return format(now, "h:mm a");
  }, []);

  // Calculate creator join date
  const dateString = "2023-08-10"; // Assuming the date is in 'yyyy-MM-dd' format
  const date = parse(dateString, "yyyy-MM-dd", new Date());
  const formattedDate = format(date, "MMM dd, yyyy");

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
            className="cursor-pointer text-3xl font-bold"
            onClick={closeModal}
          />
          <div className="mt-12 pl-2 flex flex-col gap-8 font-lato">
            <div className="border-b pb-6">
              <h2 className="text-black font-bold text-3xl">
                {singleTask?.title}
              </h2>

              <small className="text-gray-500 mt-8 inline-block">
                Posted {timeAgo}
              </small>
            </div>

            <p className="text-gray-500 border-b pb-6">
              {singleTask?.description}
            </p>

            {singleTask?.pricing === "Fixed rate" ? (
              <div className="border-b pb-6">
                <div className="grid grid-cols-2 xl:grid-cols-3 xl:w-[500px] gap-3">
                  <div className="flex items-center gap-2">
                    <AiFillTag />
                    <div>
                      <p>₦{parseInt(singleTask?.budget).toLocaleString()}</p>
                      <small>Budget</small>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaUserTie />
                    <div>
                      <p>{singleTask?.experience}</p>
                      <small>Experience Level</small>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <IoMdClock />

                    <div>
                      <p>{singleTask.pricing}</p>
                      <small>Pricing</small>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsCalendarDateFill />

                    <div>
                      <p>{singleTask.duration}</p>
                      <small>Duration</small>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-b pb-6">
                <div className="grid grid-cols-2 xl:grid-cols-3 xl:w-[500px] gap-3">
                  <div className="flex items-center gap-2">
                    <IoMdClock />
                    <div>
                      <p>{singleTask?.pricing}</p>
                      <span>Pricing</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BsCalendarDateFill />
                    <div>
                      <p>{singleTask?.duration}</p>
                      <span className="text-gray-500">Duration</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaUserTie />
                    <div>
                      <p>{singleTask?.experience}</p>
                      <span>Experience Level</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaLocationDot />

                    <p>Remote Job</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <HiOutlineClock />
                    <div>
                      <p>₦{singleTask?.payRate}</p>
                      <p>Pay rate</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <PiSuitcaseSimpleLight />
                    <div>
                      <p>{singleTask?.timeRequirement}</p>
                      <p>Required hours</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="border-b pb-6">
              <h3 className="text-lg font-bold mb-8">Skills</h3>
              <div className="flex flex-col gap-4">
                {singleTask?.skills.map((skill, index) => (
                  <div key={index}>
                    <span className="bg-gray-300 py-1 px-4 rounded-2xl text-gray-600">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {singleTask?.docFile && (
              <div className="border-b pb-6">
                <h3 className="text-lg font-bold mb-8">Attachment</h3>
                <div
                  className={`flex items-center ${
                    singleTask?.filename?.split(".")[1] === "pdf"
                      ? "bg-red-600 text-white"
                      : "bg-white text-black"
                  } rounded-lg h-14 w-full px-4 gap-3`}
                >
                  {singleTask?.filename?.split(".")[1] === "pdf" ? (
                    <BsFillFileEarmarkPdfFill />
                  ) : (
                    <BsFillFileEarmarkWordFill className="text-blue-500" />
                  )}

                  <Link href={singleTask?.docFile} target="_blank">
                    {singleTask?.filename && singleTask?.filename?.length > 20
                      ? singleTask?.filename?.substring(0, 20) + "..."
                      : singleTask?.filename}
                  </Link>
                </div>
              </div>
            )}

            {singleTask?.img && (
              <div className="border-b pb-6">
                <h3 className="text-lg font-bold mb-8">Attachment</h3>
                <Image
                  src={singleTask.img}
                  alt="attachment file"
                  width={200}
                  height={200}
                />
              </div>
            )}
            <div className="border-b pb-6">
              <h3 className="text-lg font-bold mb-8">Activity on this task</h3>
              <div className="grid grid-cols-2 xl:grid-cols-3 xl:w-[500px] gap-3">
                <div>
                  <p>20 - 30</p>
                  <span className="text-gray-500">Proposals</span>
                </div>
                <div>
                  <p>3 hours ago</p>
                  <span className="text-gray-500">Last viewed by client</span>
                </div>
                <div>
                  <p>1</p>
                  <span className="text-gray-500">Interviewing</span>
                </div>
              </div>
            </div>

            <div className="pb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold">About the client</h3>
                <small className="block">Member since {formattedDate}</small>
              </div>
              <div className="grid grid-cols-2 xl:grid-cols-3 xl:w-[500px] gap-3">
                <div>
                  <p>Nigeria</p>
                  <span className="text-gray-500">
                    {user?.address?.city} {getCurrentTimeWithAMPM}
                  </span>
                </div>
                <div>
                  <p>
                    {creatorTaskInfo?.length}{" "}
                    {creatorTaskInfo && creatorTaskInfo?.length > 1
                      ? "tasks posted"
                      : "task posted"}
                  </p>
                  <span className="text-gray-500">90% hire rate</span>
                </div>
                <div>
                  <p>#6K total spent</p>
                  <span className="text-gray-500">45 hires, 6 active</span>
                </div>
              </div>
            </div>
            {session ? (
              <div className="w-full flex items-center justify-center font-roboto">
                <button
                  className="text-white bg-primary rounded-lg py-2 px-7 w-full text-center text-2xl shadow-2xl"
                  onClick={handleApplyButton}
                >
                  Apply
                </button>
              </div>
            ) : (
              <div className="flex justify-between font-roboto shadow-2xl p-4 rounded-lg">
                <Link
                  href="/api/auth/login"
                  className="flex-1 py-3 rounded-xl text-lg text-center"
                >
                  Log In
                </Link>
                <Link
                  href="/api/auth/join"
                  className="bg-primary flex-1 py-3 rounded-xl text-lg text-white text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
