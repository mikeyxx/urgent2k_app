import React, { Suspense } from "react";
import { BsSearch } from "react-icons/bs";
import Tasks from "./Tasks";
import InPageFilterComp from "@/utils/InPageFilterComp";

async function Feeds() {
  return (
    <div className="flex-1 flex flex-col md:border border-gray-300 rounded-2xl py-8 gap-8">
      <div className="md:px-8 w-full flex justify-between items-center gap-4">
        <form className="flex justify-between border rounded-xl border-primary transition-all duration-300 w-full">
          <input
            type="text"
            placeholder="Search for jobs"
            className="border-0 w-full h-9 p-2 focus:outline-none rounded-tl-xl text-base rounded-bl-xl transition duration-300"
          />

          <button type="submit" className="bg-primary text-white rounded-r-xl">
            <BsSearch className="text-xl mx-4 place-self-center " />
          </button>
        </form>
        <InPageFilterComp />
      </div>

      <Tasks />

      <div className="place-self-center">
        <button className="border border-b/25 py-1 px-12 rounded-lg cursor-pointer hover:bg-b/25">
          Load more jobs
        </button>
      </div>
    </div>
  );
}

export default Feeds;
