import React from "react";
import Image from "next/image";

function Dashboard() {
  return (
    <div className="min-h-screen pt-28 pb-6 w-full max-w-[1500px] m-auto px-6 lg:px-0">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:max-w-lg flex-center flex-col place-self-start gap-20">
          <div className="w-full flex-center shadow-xl gap-3 rounded-xl p-3">
            <Image
              src="/profile.svg"
              alt="profile picture"
              width={100}
              height={100}
            />

            <p className="text-xl">Peter Kukucan</p>
          </div>
          <div className="w-full flex-center flex-col shadow-xl gap-3 rounded-xl p-3">
            <h4 className="text-xl">Total Earnings</h4>
            <span className="text-lg text-primary">0</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col rounded-xl place-self-start gap-20 w-full">
          <div className="shadow-xl pb-3 rounded-xl p-4 w-full">
            <div className="flex items-center gap-6">
              <h4 className="font-bold text-xl">Active Tasks</h4>
              <span className="text-xl text-primary">3</span>
            </div>

            <ul>
              <li>Task one</li>
              <li>Task two</li>
              <li>Task three</li>
            </ul>
          </div>
          <div className="shadow-xl pb-3 rounded-xl p-4 w-full">
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-xl">Completed Tasks</h4>
              <span className="text-xl text-primary">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
