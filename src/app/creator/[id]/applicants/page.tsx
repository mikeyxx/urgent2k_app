"use client";

import React, { useEffect, useState } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { DBUser, ExecutorProfileDocument, ProposalProps } from "@/utils/lib";
import Link from "next/link";
import StarRating from "@/utils/StarRating";
import ProposalSkeleton from "@/utils/ProposalSkeleton";
import ActiveProposalExecutorProfile from "@/components/ActiveProposalExecutorProfile";
import { db } from "@/firebase";
import toast, { Toaster } from "react-hot-toast";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getDBUser, getExecutorProfile } from "@/api";

function Proposals() {
  const [proposals, setProposals] = useState<ProposalProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const params = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [executorId, setExecutorId] = useState<string | null>(null);
  const { user, isLoading } = useKindeBrowserClient();
  const [dbUser, setDBUser] = useState<DBUser | null>(null);
  const [executorProfile, setExecutorProfile] =
    useState<ExecutorProfileDocument | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const res = await fetch(`/api/proposal/task/${params.id}`);
        const data = await res.json();

        if (data.length === 0) {
          setProposals([]);
        } else {
          setProposals(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [params.id]);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSelected = (id: string) => {
    setOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling

    if (executorId === null) {
      setExecutorId(id);
    } else if (executorId !== id) {
      setExecutorId(id);
    }
  };

  const userId = proposals
    ?.map((proposal) => proposal.executorId._id)
    .join(" ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const dbUserData = await getDBUser(userId);
          setDBUser(dbUserData);

          const executorProfileData = await getExecutorProfile(userId);
          setExecutorProfile(executorProfileData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  async function startConversation(
    senderId: string | undefined,
    receiverId: string,
    taskId: string
  ) {
    //Check if conversation exists

    if (senderId && receiverId) {
      const combinedId =
        senderId > receiverId ? senderId + receiverId : receiverId + senderId;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          //create user chats
          await updateDoc(doc(db, "conversations", receiverId), {
            [combinedId + ".userInfo"]: {
              userId: user?.id,
              name: user?.given_name,
              photo: user?.picture,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "conversations", senderId), {
            [combinedId + ".userInfo"]: {
              userId: dbUser?._id,
              name: dbUser?.name,
              photo: executorProfile?.image,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }

        const messagedUser = {
          userId: dbUser?._id,
          name: dbUser?.name,
          image: executorProfile?.image,
        };

        const response = await fetch(`/api/create-task/${taskId}`, {
          method: "PATCH",
          body: JSON.stringify({
            messaged: messagedUser,
          }),
        });

        if (response.ok) {
          console.log("success");
        }
        router.push("/messages");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("senderId and/or receiverId is undefined");
    }
  }

  const handleCreatorList = () => {
    toast("Oops! We are still working on this feature", {
      icon: "😥",
    });
  };

  return (
    <>
      <div className="w-[1000px] pt-28 lg:pt-40 max-w-full min-h-[calc(100vh-64px)] px-4 pb-5 m-auto">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-xl lg:text-2xl font-bold">Review Proposals</h3>
          <button
            onClick={handleCreatorList}
            className="hover:bg-primary hover:text-white px-4 py-1 rounded-lg shadow-md"
          >
            Hire from your list
          </button>
        </div>

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
          {loading ? (
            <ProposalSkeleton />
          ) : proposals && proposals.length > 0 ? (
            proposals.map((proposal) => (
              <div
                key={proposal._id}
                className="border-b-2 flex items-center flex-col lg:flex-row"
              >
                <div className="px-6 py-5 flex-1">
                  {isExpanded && (
                    <div>
                      <p>
                        {proposal.coverLetter}
                        <button
                          className="px-4 py-1 rounded-lg hover:text-primary text-sm"
                          onClick={toggleReadMore}
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      </p>
                    </div>
                  )}
                  {!isExpanded && proposal.coverLetter.length > 300 && (
                    <p>
                      {proposal.coverLetter.slice(0, 300)}...
                      <button
                        className="px-4 py-1 rounded-lg hover:text-primary text-sm"
                        onClick={toggleReadMore}
                      >
                        {isExpanded ? "Read less" : "Read more"}
                      </button>
                    </p>
                  )}
                  {!isExpanded && proposal.coverLetter.length < 300 && (
                    <p>{proposal.coverLetter}</p>
                  )}

                  {proposals.map((proposal) => (
                    <div key={proposal._id} className="mt-5">
                      <p>
                        Pricing:{" "}
                        <span>
                          {proposal.hourlyRate ? "Hourly rate" : "Fixed rate"}
                        </span>
                      </p>
                      <p>
                        Rate:{" "}
                        <span>
                          ₦
                          {proposal.hourlyRate
                            ? proposal.hourlyRate
                            : proposal.fixedRate}
                          /hr
                        </span>
                      </p>
                    </div>
                  ))}

                  <div className="mt-5">
                    <Link
                      href={`/offer/${proposal._id}`}
                      className="hover:bg-primary hover:text-white px-4 py-1 rounded-lg shadow-md"
                    >
                      Hire
                    </Link>
                  </div>
                </div>

                <div className="lg:border-l max-md:border-t px-6 py-5 min-w-[200px] text-center">
                  <p>{proposal.executorId.name}</p>
                  <StarRating />
                  <small>0 tasks completed</small>
                  <div className="mt-4 flex flex-col items-center gap-5">
                    <button
                      className="hover:bg-primary hover:text-white px-4 py-1 rounded-lg shadow-md"
                      onClick={() => handleSelected(proposal.executorId._id)}
                    >
                      View profile
                    </button>

                    <button
                      className="bg-primary text-white px-4 py-1 rounded-lg shadow-md"
                      onClick={() =>
                        startConversation(
                          user?.id,
                          proposal.executorId._id,
                          proposal.taskId
                        )
                      }
                    >
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center px-6 py-5">
              <div className="text-xl">
                <FaFolderOpen className="text-center w-full text-4xl text-primary" />
                <p className="text-gray-500 mt-4">No qualified proposals yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ActiveProposalExecutorProfile
        open={open}
        setOpen={setOpen}
        executorId={executorId}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default Proposals;
