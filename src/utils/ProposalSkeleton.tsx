import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProposalSkeleton = () => {
  return (
    <div className="border-b-2 flex items-center flex-col lg:flex-row">
      <div className="px-6 py-5 flex-1 w-full">
        <Skeleton height={20} width="100%" count={3} />
        <div className="mt-4 flex items-center gap-5 w-full">
          <Skeleton height={30} width={60} />

          <Skeleton height={30} width={60} />
        </div>
      </div>

      <div className="border-l px-6 py-5 h-full w-full">
        <Skeleton height={20} width={150} />
        <Skeleton height={20} width={100} />
        <Skeleton height={20} width={120} />
        <div className="mt-4 flex items-center gap-5 w-full">
          <Skeleton height={30} width={60} />
          <Skeleton height={30} width={60} />
        </div>
      </div>
    </div>
  );
};

export default ProposalSkeleton;
