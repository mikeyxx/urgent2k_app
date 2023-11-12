"use client";

import React from "react";
import Image from "next/image";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { MdLocationPin, MdModeEditOutline } from "react-icons/md";
import Link from "next/link";
import StarRating from "@/utils/StarRating";
import { useSession } from "next-auth/react";
import { usePathname, useParams } from "next/navigation";
import { useUtilsContext } from "@/context/UtilsContext";

function Profile() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const params = useParams();
  const { getUser, user } = useUtilsContext();

  if (pathname === `/view/creator/${params.id}/profile`) {
    getUser(params.id);
  } else {
    getUser(session?.user.id);
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="lg:w-[300px] w-full border rounded-xl flex-center flex-col p-6 gap-3 place-self-start">
        <div className="border-b-2 w-full flex-center flex-col gap-3 pb-3">
          <div className="relative">
            <Image
              src={user?.image ?? "/no-profile-icon.png"}
              alt="profile picture"
              width={100}
              height={100}
              className="rounded-full"
            />
            <button className="h-fit w-fit p-1 rounded-full border border-primary bg-primary text-white absolute top-0 right-0">
              <MdModeEditOutline />
            </button>
          </div>
          <p>{user?.name}</p>

          <StarRating />

          <div className="flex items-center gap-3 lg:text-sm">
            <PiSuitcaseSimpleLight className="text-primary" />
            <p>0 total hire</p>
          </div>

          <div className="flex items-center lg:text-sm">
            <MdLocationPin className="text-primary" />

            <address>Ibadan, Nigeria</address>
          </div>
        </div>

        <div className="border-b-2 w-full text-center pb-3 mt-8">
          <h4>Verification Status</h4>
          <p>
            ID: <span className="text-primary lg:text-sm">Verified</span>
          </p>
        </div>
        <div className="w-full text-center pb-3 mt-8">
          <h4>Average hourly rate paid</h4>
          <small className="text-primary">₦300</small>
        </div>

        {session?.user.role === "executor" && (
          <Link
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-md text-center mt-2"
            href="/messages"
          >
            Chat with creator
          </Link>
        )}
      </div>
      <div className="border flex-1 rounded-xl p-6 place-self-start w-full">
        <div className="w-full pb-3 mt-8">
          <h4 className="text-center text-xl">Work History</h4>

          <div className="flex lg:flex-row flex-col items-center justify-between mt-6 gap-5 lg:gap-0">
            <Link
              href="/executor/dashboard/active-task"
              className="flex flex-col items-center gap-4 hover:text-primary"
            >
              <h5 className="lg:text-sm">Total task</h5>
              <div className="w-20 h-20 border border-primary rounded-full flex items-center justify-center">
                <span>0</span>
              </div>
            </Link>
            <Link
              href="/executor/dashboard/completed-task"
              className="flex flex-col items-center gap-4 hover:text-primary"
            >
              <h5 className="lg:text-sm">Active task</h5>
              <div className="w-20 h-20 border border-primary rounded-full flex items-center justify-center">
                <span>0</span>
              </div>
            </Link>
            <Link
              href="/executor/dashboard/active-proposal"
              className="flex flex-col items-center gap-4 hover:text-primary"
            >
              <h5 className="lg:text-sm">Money paid out</h5>
              <div className="w-20 h-20 border border-primary rounded-full flex items-center justify-center">
                <span>0</span>
              </div>
            </Link>
            <Link
              href="/executor/dashboard/submitted-proposal"
              className="flex flex-col items-center gap-4 hover:text-primary"
            >
              <h5 className="lg:text-sm">Active hire</h5>
              <div className="w-20 h-20 border border-primary rounded-full flex items-center justify-center">
                <span>0</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
