"use client";

import React from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";

function CustomSearchbox() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/tasks/search");
  };
  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <p className="text-2xl xl:text-3xl font-semibold">
        Browse through available gigs
      </p>
      <div className="flex-center border-t-2 border-b-2 border-l-2 h-11 rounded-xl border-primary">
        <input
          type="text"
          placeholder="Search for any service"
          className="border-0 w-full p-2 h-full focus:outline-none focus:bg-gray-200 rounded-tl-xl text-xl rounded-bl-xl"
        />
        <button
          type="submit"
          className="bg-primary h-full flex rounded-tr-xl rounded-br-xl cursor-pointer"
        >
          <BsSearch className="text-2xl mx-6 place-self-center text-white" />
        </button>
      </div>
      <div className="flex flex-row items-center justify-start gap-2">
        <h3 className="font-semibold md:block hidden">Popular on Urgent2k:</h3>
        <p className="font-semibold md:hidden block">Popular:</p>
        <p className="border border-primary hidden md:block p-1 rounded-lg text-sm">
          PowerPoint Presentation
        </p>
        <p className="border border-primary p-1 rounded-lg text-sm">
          Logo Design
        </p>
        <p className="border border-primary p-1 rounded-lg text-sm">Writing</p>
      </div>
    </form>
  );
}

export default CustomSearchbox;
