import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TaskItemSkeleton = () => {
  return (
    <div className="border-b md:px-8 py-4 hover:bg-green-50 h-full flex flex-col gap-3 cursor-pointer transition duration-500">
      <h3 className="font-semibold text-lg">
        <Skeleton width={200} height={20} />
      </h3>

      <div className="flex flex-col md:flex-row gap-1 text-gray-500">
        <small>
          <Skeleton width={80} height={15} />
        </small>
        <small>
          <Skeleton width={80} height={15} />
        </small>
        <small>
          <Skeleton width={80} height={15} />
        </small>
        <small>
          <Skeleton width={80} height={15} />
        </small>
        <small>
          <Skeleton width={80} height={15} />
        </small>
      </div>

      <p className="text-gray-600">
        <Skeleton count={5} />
      </p>

      <div className="flex gap-3">
        <Skeleton width={100} height={20} count={3} />
      </div>
    </div>
  );
};

export default TaskItemSkeleton;
