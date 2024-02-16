"use client";

import React, { useEffect, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdRssFeed } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { DBUser } from "@/utils/lib";
import { getDBUser } from "@/api";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ open, setOpen }: SidebarProps) {
  const [dropdownOption1, setDropdownOption1] = useState(false);
  const [dropdownOption2, setDropdownOption2] = useState(false);
  const [dbUser, setDBUser] = useState<DBUser | null>(null);
  const router = useRouter();
  const { user, isLoading } = useKindeBrowserClient();

  useEffect(() => {
    const fetchDBUSer = async () => {
      const data = await getDBUser(user?.id);
      setDBUser(data);
    };

    fetchDBUSer();
  }, [user?.id]);

  const handleDropdownOne = () => {
    setDropdownOption1((prev) => !prev);
    setDropdownOption2(false);
  };
  const handleDropdownTwo = () => {
    setDropdownOption2((prev) => !prev);
    setDropdownOption1(false);
  };

  const handleSignUpModal = () => {
    setOpen(false);

    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const goToFeeds = () => {
    router.push("/executor/feed");

    setOpen(false);

    document.body.style.overflow = "auto";
  };

  const goToProfile = () => {
    router.push("/executor/profile");

    setOpen(false);

    document.body.style.overflow = "auto";
  };

  const goToMessages = () => {
    router.push("/messages");

    setOpen(false);

    document.body.style.overflow = "auto";
  };

  const goToActiveTasks = () => {
    router.push("/creator/active-tasks");

    setOpen(false);

    document.body.style.overflow = "auto";
  };

  const goToCreatorProfile = () => {
    router.push("/creator/profile");

    setOpen(false);

    document.body.style.overflow = "auto";
  };

  const goToCreatorMessages = () => {
    router.push("/messages");

    setOpen(false);

    document.body.style.overflow = "auto";
  };

  return (
    <div
      className={`fixed z-30 bg-white xl:hidden block w-0 ${
        open && "w-[85%]"
      } transition-all duration-500 ease-in-out h-[calc(100vh-64px)] pt-8 overflow-hidden`}
    >
      <nav className="p-4 flex flex-col justify-between m-auto w-[95%] max-w-[1700px] h-full">
        <ul
          className={`flex flex-col gap-4 opacity-0 ${
            open && "opacity-100"
          } transition ease-in-out`}
        >
          <li onClick={handleDropdownOne}>
            <div className="flex justify-between w-full">
              <p>Find Talent</p>
              {dropdownOption1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {dropdownOption1 && (
              <div className="flex justify-between mt-4 bg-gray-200 p-2">
                <p className="ml-2">Post a task and hire someone</p>
                <IoIosArrowForward />
              </div>
            )}
          </li>
          <li onClick={handleDropdownTwo}>
            <div className="flex justify-between w-full">
              <p>Find Work</p>
              {dropdownOption2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {dropdownOption2 && (
              <div className="flex justify-between mt-4 bg-gray-200 p-2">
                <p className="ml-2">Find work for your skill</p>
                <IoIosArrowForward />
              </div>
            )}
          </li>
          {!user && (
            <li
              onClick={() => {
                setOpen(false);
                document.body.style.overflow = "auto";
              }}
            >
              <LoginLink>Log in</LoginLink>
            </li>
          )}

          {dbUser?.role === "executor" && (
            <>
              <li>
                <button className="flex gap-2 items-center" onClick={goToFeeds}>
                  <MdRssFeed className="text-xl" />
                  <span>Feed</span>
                </button>
              </li>
              <li>
                <button
                  className="flex gap-2 items-center"
                  onClick={goToProfile}
                >
                  <FaUserTie className="text-xl" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  className="flex gap-2 items-center"
                  onClick={goToMessages}
                >
                  <div className="relative">
                    <BiMessageDetail className="text-xl" />

                    {/* <p className="absolute top-[-8px] right-[-10px] bg-red-600 text-white h-4 w-4 rounded-full text-xs text-center">
                      9
                    </p> */}
                  </div>
                  <span>Messages</span>
                </button>
              </li>
            </>
          )}
          {dbUser?.role === "creator" && (
            <>
              <li>
                <button
                  className="flex gap-2 items-center"
                  onClick={goToActiveTasks}
                >
                  <BsListTask className="text-xl" />
                  <span>Active Task</span>
                </button>
              </li>
              <li>
                <button
                  className="flex gap-2 items-center"
                  onClick={goToCreatorProfile}
                >
                  <FaUserTie className="text-xl" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  className="flex gap-2 items-center"
                  onClick={goToCreatorMessages}
                >
                  <div className="relative">
                    <BiMessageDetail className="text-xl" />

                    <p className="absolute top-[-8px] right-[-10px] bg-red-600 text-white h-4 w-4 rounded-full text-xs text-center">
                      9
                    </p>
                  </div>
                  <span>Messages</span>
                </button>
              </li>
            </>
          )}
        </ul>

        {!user && (
          <div className="flex-center">
            <button
              className="bg-primary relative w-full p-[12px] rounded-xl text-white text-lg sm:text-xl"
              onClick={handleSignUpModal}
            >
              <RegisterLink>Sign Up</RegisterLink>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
