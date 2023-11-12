"use client";

import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import SearchResults from "./SearchResults";
import { TaskDetailsProps } from "@/utils/lib";

function SearchResultComp() {
  const [isVisible, setIsVisible] = useState(false);
  const [task, setTask] = useState<TaskDetailsProps[]>([]);

  useEffect(() => {
    const getTask = async () => {
      const res = await fetch("/api/create-task");

      const data = await res.json();

      setTask(data);
    };

    getTask();
  }, []);

  return (
    <div className="py-8 flex justify-between transition-all duration-500">
      <Filters isVisible={isVisible} setIsVisible={setIsVisible} />
      <SearchResults setIsVisible={setIsVisible} task={task} />
    </div>
  );
}

export default SearchResultComp;
