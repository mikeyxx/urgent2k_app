import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

function MyJobsCard() {
  return (
    <div className="border flex items-center flex-col p-5 rounded-lg lg:w-[280px]">
      <Link href="/">
        <div className="flex items-center justify-between w-full">
          <p>My Tasks</p>
          <BsArrowRight />
        </div>

        <div className="flex items-center justify-between w-full gap-2">
          <p className="text-gray-500 text-sm">View your active tasks</p>
          <Image src="/task.svg" alt="" width={70} height={70} />
        </div>
      </Link>
    </div>
  );
}

export default MyJobsCard;
