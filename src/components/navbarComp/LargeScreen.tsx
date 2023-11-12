import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUserTie } from "react-icons/fa";
import { MdRssFeed } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { BsListTask } from "react-icons/bs";
import { DBUser, ExecutorProfileDocument } from "@/utils/lib";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

interface LargeScreenProps {
  offset: number;
  userMenuOpen: boolean;
  setUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dbUser: DBUser;
  profile: ExecutorProfileDocument;
  user: any;
}

function LargeScreen({
  offset,
  userMenuOpen,
  setUserMenuOpen,
  dbUser,
  profile,
  user,
}: LargeScreenProps) {
  const pathname = usePathname();

  return (
    <div className="justify-between items-center w-full xl:flex hidden max-w-[1700px] m-auto">
      <div className="flex items-center gap-4">
        <Link href="/">
          <span className="text-xl">Urgent2k</span>
        </Link>

        {dbUser && dbUser.role === "executor" && (
          <div className="flex gap-4 items-center pt-2">
            <Link href="/executor/feed" className="text-xl" title="Feed">
              <MdRssFeed />
            </Link>

            <Link href="/executor/profile" className="text-xl" title="profile">
              <FaUserTie />
            </Link>

            <Link href="/messages" className="text-xl" title="message">
              <div className="relative">
                <BiMessageDetail />
                {/* <p className="absolute top-[-8px] right-[-10px] bg-red-600 text-white h-4 w-4 rounded-full text-xs text-center">
                  9
                </p> */}
              </div>
            </Link>
          </div>
        )}

        {dbUser && dbUser.role === "creator" && (
          <div className="flex gap-4 items-center pt-2">
            <Link
              href="/creator/active-tasks"
              className="text-xl"
              title="active tasks"
            >
              <BsListTask />
            </Link>

            <Link href="/creator/profile" className="text-xl" title="profile">
              <FaUserTie />
            </Link>

            <Link href="/messages" className="text-xl" title="messages">
              <div className="relative">
                <BiMessageDetail />

                {/* <p className="absolute top-[-8px] right-[-10px] bg-red-600 text-white h-4 w-4 rounded-full text-xs text-center">
                  9
                </p> */}
              </div>
            </Link>
          </div>
        )}
      </div>
      {user ? (
        <div
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="relative"
        >
          <Image
            src={`${profile ? profile.image : "/no-profile-icon.png"}`}
            alt="profile image"
            width={37}
            height={37}
            className="rounded-full w-[37px] h-[37px] object-cover cursor-pointer"
          />

          {userMenuOpen && (
            <div className="absolute top-12 right-4 bg-white shadow-lg text-black rounded-lg p-4 w-[200px] flex flex-col justify-center z-20">
              <div className="flex flex-col text-center">
                <Image
                  src="/profile.svg"
                  alt="profile"
                  width={60}
                  height={60}
                  className="rounded-full w-[37px] h-[37px] object-cover place-self-center"
                />
                <p className="font-semibold text-base">{user.given_name}</p>
                <small className="text-sm font-normal">{dbUser?.role}</small>
              </div>

              <LogoutLink>
                <div className="flex font-medium text-base gap-2 mt-10 cursor-pointer items-center place-self-center">
                  <RiLogoutCircleLine />
                  <p>Log out</p>
                </div>
              </LogoutLink>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`flex-center gap-6 ${
            pathname === "/api/auth/join" && "opacity-0"
          } ${pathname === "/api/auth/login" && "opacity-0"} `}
        >
          <LoginLink>
            <button
              className={`text-base text-gray-600 ${
                pathname !== "/" && "text-white"
              } p-2 rounded-lg hover:text-primary transition duration-500 ${
                offset >= 25 && "text-white hover:text-white"
              }`}
            >
              Sign In
            </button>
          </LoginLink>

          <RegisterLink>
            <button
              className={`text-base text-gray-600 border ${
                pathname !== "/" && "text-white"
              } border-primary p-2 rounded-lg hover:bg-primary hover:text-white transition duration-500 ${
                offset >= 25 && "text-white"
              }`}
            >
              Sign Up
            </button>
          </RegisterLink>
        </div>
      )}
    </div>
  );
}

export default LargeScreen;
