import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RiLogoutCircleLine } from "react-icons/ri";
import HamburgerMenu from "./HamburgerMenu";
import {
  CreatorProfileDocument,
  DBUser,
  ExecutorProfileDocument,
} from "@/utils/lib";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

interface MediumScreenProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  offset: number;
  userMenuOpen: boolean;
  setUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dbUser: DBUser;
  executorProfile: ExecutorProfileDocument[];
  creatorProfile: CreatorProfileDocument[];
  user: any;
}

function MediumScreen({
  open,
  setOpen,
  offset,
  userMenuOpen,
  setUserMenuOpen,
  dbUser,
  executorProfile,
  creatorProfile,
  user,
}: MediumScreenProps) {
  const pathname = usePathname();

  const handleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
    setOpen(false);
  };

  return (
    <div className="justify-between items-center w-full md:max-xl:flex hidden h-full">
      <div className="flex justify-center items-center gap-5">
        {pathname !== "/api/auth/join" && pathname !== "/api/auth/login" && (
          <HamburgerMenu open={open} setOpen={setOpen} offset={offset} />
        )}

        <Link href="/">
          <span className="text-xl">Urgent2k</span>
        </Link>
      </div>
      {user ? (
        dbUser.role === "executor" ? (
          <div onClick={handleUserMenu} className="relative">
            <Image
              src={`${
                executorProfile[0]?.image ||
                user?.picture ||
                "/no-profile-icon.png"
              }`}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full w-[37px] h-[37px] object-cover cursor-pointer"
            />

            {userMenuOpen && (
              <div className="absolute top-12 right-4 bg-white shadow-lg text-black rounded-lg p-4 w-[200px] flex flex-col items-center justify-center">
                <div className="flex flex-col">
                  <Image
                    src={`${
                      executorProfile[0]?.image ||
                      user?.picture ||
                      "/no-profile-icon.png"
                    }`}
                    alt="profile image"
                    width={60}
                    height={60}
                    className="rounded-full w-[37px] h-[37px] object-cover place-self-center"
                  />
                  <p className="font-semibold text-base">{dbUser?.name}</p>
                  <small className="text-sm font-normal place-self-center">
                    {dbUser?.role}
                  </small>
                </div>
                <div className="flex items-center font-medium text-base gap-3 mt-10 cursor-pointer">
                  <RiLogoutCircleLine />
                  <p>Log out</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div onClick={handleUserMenu} className="relative">
            <Image
              src={`${
                creatorProfile[0]?.image ||
                user.picture ||
                "/no-profile-icon.png"
              }`}
              alt="profile image"
              width={37}
              height={37}
              className="rounded-full w-[37px] h-[37px] object-cover cursor-pointer"
            />

            {userMenuOpen && (
              <div className="absolute top-12 right-4 bg-white shadow-lg text-black rounded-lg p-4 w-[200px] flex flex-col items-center justify-center">
                <div className="flex flex-col">
                  <Image
                    src={`${
                      creatorProfile[0]?.image ||
                      user.picture ||
                      "/no-profile-icon.png"
                    }`}
                    alt="profile image"
                    width={60}
                    height={60}
                    className="rounded-full w-[37px] h-[37px] object-cover place-self-center"
                  />
                  <p className="font-semibold text-base">{dbUser?.name}</p>
                  <small className="text-sm font-normal place-self-center">
                    {dbUser?.role}
                  </small>
                </div>
                <div className="flex items-center font-medium text-base gap-3 mt-10 cursor-pointer">
                  <RiLogoutCircleLine />
                  <p>Log out</p>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        <div
          className={`flex-center gap-6 ${open && "opacity-0"} ${
            pathname === "/api/auth/join" && "opacity-0"
          } ${pathname === "/api/auth/login" && "opacity-0"}
              `}
        >
          <button
            className={`text-lg text-gray-600 ${
              pathname !== "/" && "text-white"
            } transition duration-500 ${
              offset >= 25 ? "text-white" : "hover:text-primary"
            }`}
          >
            <LoginLink>Sign In</LoginLink>
          </button>

          <button
            className={`text-lg border border-primary p-2 text-gray-600 rounded-lg hover:bg-primary hover:text-white transition duration-500 ${
              pathname !== "/" && "text-white"
            } ${offset >= 25 && "text-white"}`}
          >
            <RegisterLink>Sign Up</RegisterLink>
          </button>
        </div>
      )}
    </div>
  );
}

export default MediumScreen;
