import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ExecutorProfileSkeletonProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ExecutorProfileSkeleton({
  open,
  setOpen,
}: ExecutorProfileSkeletonProps) {
  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div
      className={`fixed right-0 top-0 bg-white lg:rounded-l-xl h-full flex flex-col z-50 w-0 ${
        open && "w-[100%] lg:w-[60%]"
      } transition-all duration-300 overflow-scroll`}
    >
      <div className="py-8 px-6">
        <IoIosArrowForward
          className="cursor-pointer text-3xl ml-[-10px] mb-5 font-bold"
          onClick={closeModal}
        />

        {/* Skeleton for user profiles */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-[300px] w-full border rounded-xl flex-center flex-col p-6 gap-3 place-self-start">
            {/* Skeleton for user profile picture */}
            <Skeleton circle height={100} width={100} />

            {/* Skeleton for user profile information */}
            <div className="border-b-2 w-full flex-center flex-col gap-3 pb-3">
              <Skeleton width={100} height={20} />
              <Skeleton width={50} height={10} />
              <Skeleton width={120} height={10} />
              <Skeleton width={100} height={10} />
            </div>

            {/* Skeleton for verification status */}
            <div className="border-b-2 w-full text-center pb-3 mt-8">
              <Skeleton width={150} height={20} />
              <Skeleton width={50} height={10} />
            </div>

            {/* Skeleton for rate per hour */}
            <div className="border-b-2 w-full text-center pb-3 mt-8">
              <Skeleton width={150} height={20} />
              <Skeleton width={50} height={10} />
            </div>

            {/* Skeleton for education */}
            <div className="mt-8 w-full">
              <div className="flex items-center gap-5">
                <Skeleton width={30} height={20} />
                <h4>
                  <Skeleton width={80} height={20} />
                </h4>
              </div>
              <div className="flex items-center w-full justify-between lg:text-sm">
                <div className="mt-4">
                  <Skeleton width={150} height={20} />
                  <Skeleton width={100} height={10} />
                  <Skeleton width={80} height={10} />
                </div>
                <div className="flex gap-3">
                  <button className="h-fit w-fit p-1">
                    <Skeleton width={20} height={20} />
                  </button>
                  <button className="h-fit w-fit p-1">
                    <Skeleton width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton for user details */}
          <div className="border flex-1 rounded-xl p-6 place-self-start">
            <div className="border-b-2 pb-3">
              <h4 className="font-bold text-2xl mb-6">
                <Skeleton width={150} height={30} />
              </h4>
              <p className="text-gray-500">
                <Skeleton count={3} />
              </p>
            </div>

            {/* Skeleton for skills */}
            <div className="border-b-2 pb-3 mt-8 w-full">
              <div className="flex items-center justify-center gap-2">
                <h4 className="text-center">
                  <Skeleton width={70} height={20} />
                </h4>
                <button className="h-fit w-fit p-1">
                  <Skeleton width={20} height={20} />
                </button>
              </div>
              <small>
                <Skeleton />
              </small>
            </div>

            {/* Skeleton for portfolio */}
            <div className="border-b-2 pb-3 mt-8 w-full">
              <div className="flex items-center justify-center gap-2">
                <h4 className="text-center">
                  <Skeleton width={80} height={20} />
                </h4>
                <button className="h-fit w-fit p-1">
                  <Skeleton width={20} height={20} />
                </button>
              </div>
            </div>

            {/* Skeleton for employment history */}
            <div className="flex flex-col border-b-2 pb-3 mt-8 w-full">
              <div className="flex justify-between items-center">
                <h4 className="mb-6 text-center">
                  <Skeleton width={200} height={30} />
                </h4>
                <button>
                  <Skeleton width={20} height={20} />
                </button>
              </div>

              <div className="lg:text-sm">
                <h4>
                  <Skeleton width={150} height={20} />
                </h4>
                <p>
                  <Skeleton width={100} height={10} />
                </p>
                <p>
                  <Skeleton width={80} height={10} />
                </p>
              </div>
            </div>

            {/* Skeleton for certifications */}
            <div className="border-b-2 pb-3 mt-8 w-full flex justify-between items-center">
              <h4 className="mb-6 text-center">
                <Skeleton width={200} height={30} />
              </h4>
              <button>
                <Skeleton width={20} height={20} />
              </button>
            </div>

            {/* Skeleton for portfolio */}
            <div className="mt-8 w-full flex justify-between items-center">
              <h4 className="mb-6 text-center">
                <Skeleton width={200} height={30} />
              </h4>
              <button>
                <Skeleton width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecutorProfileSkeleton;
