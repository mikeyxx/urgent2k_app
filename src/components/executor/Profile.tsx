"use client";

import React from "react";
import Image from "next/image";
import { PiSmileySad, PiSuitcaseSimpleLight } from "react-icons/pi";
import {
  MdCategory,
  MdLocationPin,
  MdModeEditOutline,
  MdOutlineSportsMartialArts,
} from "react-icons/md";
import Link from "next/link";
import { IoMdAdd, IoMdSchool } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useUtilsContext } from "@/context/UtilsContext";
import { usePathname, useParams, useRouter } from "next/navigation";
import ProfileSkeleton from "@/utils/ProfileSkeleton";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Tooltip } from "react-tooltip";
import StarRating from "@/utils/StarRating";
import { ExecutorProfileDocument } from "@/utils/executor";

function Profile() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const {
    getUser,
    getSentProposals,
    user,
    sentProposals,
    acceptedProposal,
    getAcceptedProposal,
    setEditedState,
  } = useUtilsContext();

  if (pathname === `/view/applicant/${params.id}/profile`) {
    getUser(params.id);
    getSentProposals(params.id);
    getAcceptedProposal(params.id);
  } else {
    getUser(session?.user.id);
    getSentProposals(session?.user.id);
    getAcceptedProposal(session?.user.id);
  }

  if (user === null) {
    return (
      <>
        <ProfileSkeleton />
      </>
    );
  }

  const handleProfileUpdate = (user: ExecutorProfileDocument) => {
    setEditedState(user);
    router.push("/executor/update-profile");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="lg:w-[300px] w-full border rounded-xl flex-center flex-col p-6 gap-3 place-self-start">
        <div className="border-b-2 w-full flex-center flex-col gap-3 pb-3">
          <div className="relative">
            <Image
              src={session?.user.image ?? "/no-profile-icon.png"}
              alt="profile picture"
              width={100}
              height={100}
              className="rounded-full w-[100px] h-[100px] object-cover"
            />
            <button
              className="h-fit w-fit p-1 rounded-full border border-primary bg-primary text-white absolute top-0 right-0"
              onClick={() => handleProfileUpdate(user)}
            >
              <MdModeEditOutline />
            </button>
          </div>
          <div className="flex flex-col items-center mt-3 gap-3">
            <p>{session?.user?.name}</p>

            <StarRating />
          </div>
          <div className="flex items-center gap-3 lg:text-sm">
            <PiSuitcaseSimpleLight className="text-primary" />
            <p>Completed 0 task</p>
          </div>

          <div className="flex items-center lg:text-sm">
            <MdLocationPin className="text-primary" />

            {user?.address?.country && (
              <address>
                {user?.address?.city}, {user?.address?.country}
              </address>
            )}
          </div>
        </div>

        <div className="border-b-2 w-full text-center pb-3 mt-8">
          <h4>Verification Status</h4>
          <p>
            ID: <span className="text-primary lg:text-sm">Verified</span>
          </p>
        </div>
        <div className="border-b-2 w-full text-center pb-3 mt-8">
          <h4>Your rate per hour</h4>
          <small className="text-primary">₦{user?.rate}</small>
        </div>

        <div className="mt-8 w-full flex flex-col items-center justify-center">
          <div className="flex items-center gap-5 place-self-center lg:place-self-start">
            <IoMdSchool className="text-primary" />
            <h4>Education</h4>
          </div>

          <div className="mt-4">
            <h5>{user?.education?.school}</h5>
            <p>{user?.education?.degree}</p>
            <small>
              {user?.education?.start} - {user?.education?.end}
            </small>
          </div>
        </div>
        {session?.user.role === "creator" && (
          <Link
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-md text-center mt-2"
            href="/messages"
          >
            Chat with executor
          </Link>
        )}
      </div>
      <div className="border flex-1 rounded-xl p-6 place-self-start">
        <div className="border-b-2 pb-3">
          {user?.title ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                <h4 className="font-bold text-2xl">{user?.title}</h4>
                <button
                  onClick={() => handleProfileUpdate(user)}
                  className="h-fit w-fit p-1 rounded-full border border-primary"
                >
                  <MdModeEditOutline />
                </button>
              </div>

              <p className="text-gray-500">{user?.bio}</p>
            </>
          ) : (
            <div className="flex flex-col text-center">
              {pathname !== `/view/applicant/${params.id}/profile` && (
                <>
                  <div className="flex items-center place-self-center">
                    <p>Your profile has not been updated</p>
                    <PiSmileySad />
                  </div>
                  <small className="text-primary">
                    Updating your profile improves your chances of landing a
                    task
                  </small>
                </>
              )}
              {pathname === `/view/applicant/${params.id}/profile` ? (
                <div className="mt-5 ">
                  <span>User&apos;s profile is not updated</span>
                </div>
              ) : (
                <div className="mt-5 ">
                  <button
                    onClick={() => handleProfileUpdate(user)}
                    className="border px-4 py-1 hover:bg-primary hover:text-white rounded-lg"
                  >
                    Update your profile
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-b-2 w-full pb-3 mt-8">
          <h4 className="text-center">Work History</h4>

          <div className="flex lg:flex-row flex-col items-center justify-between mt-6">
            {pathname === `/view/applicant/${params.id}/profile` ? (
              <div className="flex flex-col items-center gap-4">
                <h5 className="lg:text-sm">Active tasks</h5>
                <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
                  <span>0</span>
                </div>
              </div>
            ) : (
              <Link
                href="/executor/dashboard/active-task"
                className="flex flex-col items-center gap-4 hover:text-primary"
              >
                <h5 className="lg:text-sm">Active tasks</h5>
                <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
                  <span>0</span>
                </div>
              </Link>
            )}
            {pathname === `/view/applicant/${params.id}/profile` ? (
              <div className="flex flex-col items-center gap-4">
                <h5 className="lg:text-sm">Completed tasks</h5>
                <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
                  <span>0</span>
                </div>
              </div>
            ) : (
              <Link
                href="/executor/dashboard/completed-task"
                className="flex flex-col items-center gap-4 hover:text-primary"
              >
                <h5 className="lg:text-sm">Completed tasks</h5>
                <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
                  <span>0</span>
                </div>
              </Link>
            )}
            {pathname === `/view/applicant/${params.id}/profile` ? (
              <div className="flex flex-col items-center gap-4">
                <h5 className="lg:text-sm">Accepted proposal</h5>
                <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
                  <span>{acceptedProposal?.length}</span>
                </div>
              </div>
            ) : (
              <Link
                href="/executor/dashboard/active-proposal"
                className="flex flex-col items-center gap-4 hover:text-primary"
              >
                <h5 className="lg:text-sm">Accepted proposal</h5>
                <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
                  <span>{acceptedProposal?.length}</span>
                </div>
              </Link>
            )}
            {pathname === `/view/applicant/${params.id}/profile` ? (
              <div className="flex flex-col items-center gap-4">
                <h5 className="lg:text-sm">Submitted proposal</h5>
                <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
                  <span>{sentProposals?.length}</span>
                </div>
              </div>
            ) : (
              <Link
                href="/executor/dashboard/submitted-proposal"
                className="flex flex-col items-center gap-4 hover:text-primary"
              >
                <h5 className="lg:text-sm">Submitted proposal</h5>
                <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
                  <span>{sentProposals?.length}</span>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="border-b-2 pb-3 mt-8 w-full flex items-center justify-center flex-col">
          <div className="flex items-center gap-2">
            <button className="h-fit w-fit p-1 rounded-full">
              <MdCategory />
            </button>
            <h4 className="text-center">Categories</h4>
          </div>
          <div className="flex flex-wrap items-center mt-5 gap-2">
            {user.categories.map((category, index) => (
              <small key={index} className="text-xs bg-b/25 p-2 rounded-lg ">
                {category}
              </small>
            ))}
          </div>
        </div>
        <div className="border-b-2 pb-3 mt-8 w-full flex items-center justify-center flex-col">
          <div className="flex items-center gap-2">
            <button className="h-fit w-fit p-1 rounded-full">
              <MdOutlineSportsMartialArts />
            </button>
            <h4 className="text-center">Skills</h4>
          </div>
          <div className="flex flex-wrap items-center mt-5 gap-2">
            {user.skills.map((skill, index) => (
              <small key={index} className="text-xs bg-b/25 p-2 rounded-lg ">
                {skill}
              </small>
            ))}
          </div>
        </div>

        <div className="border-b-2 pb-3 mt-8 w-full">
          <div className="flex items-center justify-center gap-2">
            <h4 className="text-center">Portfolio</h4>
            <Link
              href={`/executor/update_portfolio/${user._id}`}
              className="h-fit w-fit p-1 rounded-full border border-primary"
            >
              <IoMdAdd />
            </Link>
          </div>
        </div>

        <div className="flex flex-col border-b-2 p-3 mt-8 w-full bg-[#f7f7f7]">
          <div className="flex items-center justify-center mb-6 gap-2">
            <h4>Employment History</h4>
            <span
              data-tooltip-id="my-workExp-tooltip"
              data-tooltip-content="You can add two of your most recent work experiences"
              className="cursor-pointer"
            >
              <HiOutlineInformationCircle />
            </span>
          </div>

          {true ? (
            <div className="flex flex-wrap gap-[20px]">
              {user?.experiences?.map((xperience, index) => (
                <div
                  key={index}
                  className="flex-1 border rounded-lg p-[15px] bg-white shadow-md min-w-[250px]"
                >
                  <h2 className="text-[15px] leading-[24px] font-semibold text-[#333]">
                    {xperience.jobTitle}
                  </h2>
                  <p className="text-[#555] text-[13px] leading-[20px]">
                    {xperience.company}
                  </p>
                  <p className="text-[#555] text-[13px] leading-[20px]">
                    {xperience.startDate} - {xperience.endDate}
                  </p>
                  <p className="text-[#555] text-[13px] leading-[20px]">
                    {xperience.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[15px] leading-[24px] text-[#555]">
              Click above to add your work exeperiences here
            </p>
          )}
        </div>
        <div className="flex flex-col border-b-2 p-3 mt-8 bg-[#f7f7f7]">
          <div className="flex items-center justify-center mb-6 gap-2">
            <h4>Certifications</h4>
            <span
              data-tooltip-id="my-certification-tooltip"
              data-tooltip-content="Click the Portfolio button above to add your Certifications here"
              className="cursor-pointer"
            >
              <HiOutlineInformationCircle />
            </span>
          </div>

          {true ? (
            <div className="flex flex-wrap gap-[20px]">
              {user?.certifications?.map((cert, index) => (
                <div
                  key={index}
                  className="flex-1 border rounded-lg p-[15px] bg-white shadow-md min-w-[250px]"
                >
                  <h2 className="text-[15px] leading-[24px] font-semibold text-[#333]">
                    {cert.title}
                  </h2>
                  <p className="text-[#555] text-[13px] leading-[20px]">
                    {cert.org}
                  </p>
                  <p className="text-[#555] text-[13px] leading-[20px]">
                    {cert.date}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[15px] leading-[24px] text-[#555]">
              Click above to add your certifications here
            </p>
          )}
        </div>
        <div className="flex flex-col border-b-2 p-3 mt-8 bg-[#f7f7f7]">
          <div className="flex items-center justify-center mb-6 gap-2">
            <h4>Portfolio</h4>
            <span
              data-tooltip-id="my-portfolio-tooltip"
              data-tooltip-content="Click the Portfolio button above to add your previous work here"
              className="cursor-pointer"
            >
              <HiOutlineInformationCircle />
            </span>
          </div>
          {true ? (
            <div className="flex flex-wrap gap-[20px]">
              {user?.projects?.map((project, index) => (
                <Link
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border rounded-lg p-[15px] bg-white shadow-md min-w-[250px]"
                >
                  <div className="rounded-lg">
                    <Image
                      src={project.image}
                      alt={`Project ${index + 1}`}
                      width={100}
                      height={100}
                      objectFit="cover"
                    />
                  </div>
                  <h2 className="text-[15px] leading-[24px] font-semibold text-[#333]">
                    {project.title}
                  </h2>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-[15px] leading-[24px] text-[#555]">
              Click above to add your portfolio here
            </p>
          )}
        </div>
      </div>
      <Tooltip id="my-certification-tooltip" />
      <Tooltip id="my-portfolio-tooltip" />
      <Tooltip id="my-workExp-tooltip" />
    </div>
  );
}

export default Profile;
