import React from "react";
import Image from "next/image";
import { BiTask } from "react-icons/bi";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import Link from "next/link";
import { SlEnvolopeLetter } from "react-icons/sl";
import { TbProgressCheck } from "react-icons/tb";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Welcome() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      <div className="w-full flex flex-col gap-8 lg:flex-row lg:gap-0 items-center justify-between">
        <div className="flex flex-col gap-4">
          <div className="font-montserrat flex flex-col gap-3 mb-4">
            <h2 className=" font-bold text-2xl">
              Hello {user?.given_name}, Welcome to Upwork!
            </h2>

            <p className="font-semibold">
              Are you ready to unlock a world of talent and get things done?
            </p>
          </div>

          <div className="flex items-center gap-4 border-b-2 pb-4">
            <BiTask />
            <p>
              Post your tasks and find skilled executor to bring your ideas to
              life
            </p>
          </div>
          <div className="flex items-center gap-4 border-b-2 pb-4">
            <PiSuitcaseSimpleLight />
            <p>
              Explore a diverse range of services offered by talented creators
            </p>
          </div>
          <div className="flex items-center gap-4 border-b-2 pb-4">
            <SlEnvolopeLetter />
            <p>
              Review proposals, chat with executors, and hire the perfect match
              for your project.
            </p>
          </div>
          <div className="flex items-center gap-4 border-b-2 pb-4">
            <TbProgressCheck />
            <p>Track the progress of your task as work gets completed</p>
          </div>

          <div className="flex flex-col items-center gap-4 lg:mt-20">
            <p>
              Ready to get started? It only takes a few minutes to set up your
              account.
            </p>

            <Link
              href="/creator/create-task/new"
              className="bg-primary text-white py-3 lg:py-1 px-5 lg:px-8 rounded-xl w-[180px] lg:w-fit lg:text-xl"
            >
              Get Started
            </Link>
          </div>
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
          <p className="text-lg mt-3">Howard Kukucan</p>
          <p className="text-sm">Fintech Company</p>
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
            &ldquo;Urgent2k has helped us hire some of the best talents to build
            our business&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}

export default Welcome;
