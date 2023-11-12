"use client";

import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Tasks from "./Tasks";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { TaskDetailsProps } from "@/utils/lib";

interface SearchResultsProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskDetailsProps[];
}

function SearchResults({ setIsVisible, task }: SearchResultsProps) {
  const [data, setData] = useState<TaskDetailsProps[] | null>(null);

  const handleModalVisibility = () => {
    setIsVisible(true);

    document.body.style.overflow = "hidden"; // Re-enable scrolling
  };

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("/api/create-task");

      const data = await res.json();

      setData(data);
    };

    getTasks();
  }, []);

  return (
    <>
      <div className="flex-1 flex flex-col md:border border-gray-300 rounded-2xl py-8 gap-8">
        <div className="md:px-8 w-full flex justify-between items-center gap-4">
          <form className="flex justify-between border rounded-xl border-primary transition-all duration-300 w-full">
            <input
              type="text"
              placeholder="Search for jobs"
              className="border-0 w-full h-9 p-2 focus:outline-none rounded-tl-xl rounded-bl-xl transition duration-300"
            />

            <button
              type="submit"
              className="bg-primary text-white rounded-r-xl"
            >
              <BsSearch className="text-xl mx-4 place-self-center " />
            </button>
          </form>
          <div
            className="max-[400]:w-10 w-fit p-[10px] h-10 rounded-full border max-[1000px]:flex items-center justify-center gap-3 border-primary text-primary hidden"
            onClick={handleModalVisibility}
          >
            <IoFilterOutline className="text-lg" />
            <span className="text-sm sm:block hidden">Filters</span>
          </div>
        </div>

        <div className="flex justify-between items-center md:px-8">
          <p>{data?.length} jobs found</p>
          <div className="flex-center min-[540px]:gap-4 gap-2">
            <p>Sort:</p>
            <select
              defaultValue="Latest"
              className="border border-gray-300 min-[540px]:px-5 rounded-xl py-1"
            >
              <option>Latest</option>
              <option>Relevant</option>
            </select>
          </div>
        </div>

        <Tasks />

        <div className="flex items-center flex-col sm:flex-row gap-4 justify-between md:px-8 w-full">
          <div className="flex-center gap-4">
            <p>Jobs per page:</p>
            <select
              defaultValue={10}
              className="border border-gray-300 px-5 rounded-xl py-1"
            >
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
          </div>
          <div className="flex-center gap-4">
            <IoIosArrowBack />
            <span>Previous</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>Next</span>
            <IoIosArrowForward />
          </div>
        </div>
      </div>

      {/* <TaskDetails open={open} setOpen={setOpen} singleTask={singleTask} /> */}
    </>
  );
}

export default SearchResults;
