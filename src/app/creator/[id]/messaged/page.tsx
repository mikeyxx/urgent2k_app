"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiSolidMessageDetail } from "react-icons/bi";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import { TaskDetailsProps } from "@/utils/lib";
import SpinningLoader from "@/utils/SpinningLoader";

function Messaged() {
  const params = useParams();
  const pathname = usePathname();

  const [singleTask, setSingleTask] = useState<TaskDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const res = await fetch(`/api/getTask/${params.id}/singleTask`);

        const data = await res.json();
        setSingleTask(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSingleTask();
  }, [params.id]);

  return (
    <div className="w-[1000px] pt-28 lg:pt-40 max-w-full min-h-[calc(100vh-64px)] px-4 pb-5 m-auto">
      <h3 className="text-xl lg:text-2xl font-bold">Messages</h3>

      <div className="border-2 mt-10 rounded-xl mb-7">
        <nav className="border-b-2 px-6 py-5">
          <ul className="flex gap-4 cursor-pointer">
            <li
              className={`${
                pathname === `/creator/${params.id}/applicants`
                  ? "text-primary"
                  : "text-gray-500"
              }`}
            >
              <Link href={`/creator/${params.id}/applicants`}>
                All proposal
              </Link>
            </li>
            <li
              className={`${
                pathname === `/creator/${params.id}/messaged`
                  ? "text-primary"
                  : "text-gray-500"
              }`}
            >
              <Link href={`/creator/${params.id}/messaged`}>Messaged</Link>
            </li>
            <li
              className={`${
                pathname === `/creator/${params.id}/hired`
                  ? "text-primary"
                  : "text-gray-500"
              }`}
            >
              <Link href={`/creator/${params.id}/hired`}>Hired</Link>
            </li>
          </ul>
        </nav>
        {loading ? (
          <SpinningLoader />
        ) : singleTask && singleTask?.messaged.length > 0 ? (
          singleTask.messaged.map((applicant) => (
            <div
              key={applicant.userId}
              className="border-b-2 px-6 py-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={applicant.image}
                  alt="applicant photo"
                  width={40}
                  height={40}
                  className="rounded-full w-[40px] h-[40px] object-cover"
                />

                <p>{applicant.name}</p>
              </div>
              <Link
                href="/messages"
                className="hover:bg-b/25 px-3 py-1 rounded-lg"
              >
                Open Chat
              </Link>
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center px-6 py-5">
            <div className="text-xl">
              <BiSolidMessageDetail className="text-center w-full text-4xl text-primary" />
              <p className="text-gray-500 mt-4">You are yet to reach out</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messaged;
