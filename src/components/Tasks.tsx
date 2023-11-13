"use client";

import React, { useState, useEffect } from "react";
import { TaskDetailsProps } from "@/utils/lib";
import TaskDetails from "./TaskDetails";
import TaskItemSkeleton from "@/utils/TaskItemSkeleton";
import { formatDistance } from "date-fns";
import { ImAttachment } from "react-icons/im";

function Tasks() {
  const [data, setData] = useState<TaskDetailsProps[] | null>(null);
  const [open, setOpen] = useState(false);
  const [singleTask, setSingleTask] = useState<null | TaskDetailsProps>(null);

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("/api/create-task");

      const data = await res.json();

      setData(data);
    };

    getTasks();
  }, []);

  const handleSelected = (_id: string) => {
    setOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling

    return data?.find((job: TaskDetailsProps) =>
      job._id === _id ? setSingleTask(job) : ""
    );
  };

  function calculateTimePosted(value: Date) {
    const jsDate = value ? new Date(value) : null;
    const currentDate = new Date();

    const timeAgo =
      jsDate && formatDistance(jsDate, currentDate, { addSuffix: true });

    return timeAgo;
  }

  if (data === null) {
    return <TaskItemSkeleton />;
  }

  return (
    <>
      {data?.map((task: TaskDetailsProps) => (
        <div
          key={task._id}
          className="border-b md:px-8 py-4 hover:bg-green-50 h-full flex flex-col gap-3 cursor-pointer transition duration-500"
          onClick={() => handleSelected(task._id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <small>Posted {calculateTimePosted(task.createdAt)}</small>
            </div>

            {task.docFile || task.img ? (
              <span className="lg:mr-[50px]" title="Contains attachment">
                <ImAttachment />
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-1 text-gray-500">
            <small>{task.pricing}</small>
            <small>
              ₦
              {task.payRate
                ? task.payRate
                : parseInt(task.budget).toLocaleString()}
            </small>
            <small>{task.experience}</small>
            <small>{task.duration}</small>
          </div>

          <p className="text-gray-600 lg:text-sm">{task.description}</p>
          <div className="flex gap-3">
            {task.skills.map((skill, index) => (
              <small
                key={index}
                className="bg-gray-300 py-1 px-4 rounded-2xl text-gray-600"
              >
                {skill}
              </small>
            ))}
          </div>
        </div>
      ))}

      <TaskDetails open={open} setOpen={setOpen} singleTask={singleTask} />
    </>
  );
}

export default Tasks;
