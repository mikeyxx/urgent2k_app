"use client";

import Link from "next/link";
import { PiSuitcaseSimpleDuotone } from "react-icons/pi";
import { useParams, usePathname } from "next/navigation";

function Hired() {
  const hasProposals = false;
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="w-[1000px] pt-28 lg:pt-40 max-w-full min-h-[calc(100vh-64px)] px-4 pb-5 m-auto">
      <h3 className="text-xl lg:text-2xl font-bold">Hired</h3>

      <div className="border-2 mt-10 rounded-xl mb-7">
        <nav className="border-b-2 px-6 py-5">
          <ul className="flex gap-4 cursor-pointer">
            <li
              className={`${
                pathname === `/creator/${params.id}/applicants`
                  ? "text-primary"
                  : "text-gray-500"
              }`}
            >
              <Link href={`/creator/${params.id}/applicants`}>
                All proposal
              </Link>
            </li>
            <li
              className={`${
                pathname === `/creator/${params.id}/messaged`
                  ? "text-primary"
                  : "text-gray-500"
              }`}
            >
              <Link href={`/creator/${params.id}/messaged`}>Messaged</Link>
            </li>
            <li
              className={`${
                pathname === `/creator/${params.id}/hired`
                  ? "text-primary"
                  : "text-gray-500"
              }`}
            >
              <Link href={`/creator/${params.id}/hired`}>Hired</Link>
            </li>
          </ul>
        </nav>

        {hasProposals ? (
          <div className="border-b-2">
            <div className="px-6 py-5">
              <h4>Mike</h4>
              <p>I will complete the task!</p>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center px-6 py-5">
            <div className="text-xl">
              <PiSuitcaseSimpleDuotone className="text-center w-full text-4xl text-primary" />
              <p className="text-gray-500 mt-4">
                You have not completed any hire for this task
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hired;
