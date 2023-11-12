import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

interface WelcomeProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

async function Welcome() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className="w-full flex flex-col gap-8 lg:flex-row lg:gap-0 items-center justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="font-montserrat font-bold text-2xl mb-8">
            Hey {session?.user.name?.split(" ")[0]}, Ready to start making wave?
          </h2>

          <div className="flex items-center gap-4 border-b-2 pb-4">
            <BiUser />
            <p>Update your profile by telling us a few things about yourself</p>
          </div>
          <div className="flex items-center gap-4 border-b-2 pb-4">
            <PiSuitcaseSimpleLight />
            <p>Apply for open tasks</p>
          </div>
          <div className="flex items-center gap-4 border-b-2 pb-4">
            <BsCashCoin />
            <p>Get paid for completed tasks</p>
          </div>

          <Link
            href="/executor/update-profile/nw"
            className="bg-primary text-white py-3 lg:py-1 px-5 lg:px-8 rounded-xl w-[180px] lg:w-fit"
          >
            Get Started
          </Link>
        </div>
        <div className="border flex-center flex-col lg:w-[400px] p-6 rounded-xl">
          <div>
            <Image
              src="/profile.svg"
              alt="profile picture"
              width={100}
              height={100}
            />
          </div>
          <p className="text-lg mt-3">Peter Kukucan</p>
          <p className="text-sm">User Experience Designer</p>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3 text-sm">
              <AiOutlineStar />
              <span>4.5</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <PiSuitcaseSimpleLight />
              <span>5 Tasks</span>
            </div>
          </div>
          <p className="mt-6">
            &ldquo;Urgent2k has given me the platform to start a career, earn
            and help people with my skills&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}

export default Welcome;
