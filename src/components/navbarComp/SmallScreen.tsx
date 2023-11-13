import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import HamburgerMenu from "./HamburgerMenu";
import { usePathname } from "next/navigation";
import {
  CreatorProfileDocument,
  DBUser,
  ExecutorProfileDocument,
} from "@/utils/lib";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

interface SmallScreenProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  offset: number;
  dbUser: DBUser;
  executorProfile: ExecutorProfileDocument[];
  creatorProfile: CreatorProfileDocument[];
  user: any;
}

function SmallScreen({
  open,
  setOpen,
  offset,
  dbUser,
  executorProfile,
  creatorProfile,
  user,
}: SmallScreenProps) {
  const pathname = usePathname();

  const handleUserMenu = () => {
    const userMenu = document.getElementById("userMenu");

    if (userMenu) {
      userMenu.classList.toggle("hidden");
    }

    setOpen(false);
  };

  return (
    <div className="justify-between h-full items-center w-full md:hidden flex sm:max-md:text-3xl">
      {pathname !== "/api/auth/join" && pathname !== "/api/auth/login" && (
        <HamburgerMenu open={open} setOpen={setOpen} offset={offset} />
      )}
      <Link href="/">
        <span>Urgent2k</span>
      </Link>
      {user ? (
        dbUser.role === "executor" ? (
          <div onClick={handleUserMenu} className="relative">
            <Image
              src={`${
                executorProfile[0]?.image ||
                user?.picture ||
                "/no-profile-icon.png"
              }`}
              alt="profile image"
              width={37}
              height={37}
              className="rounded-full w-[37px] h-[37px] object-cover cursor-pointer"
            />

            <div
              id="userMenu"
              className="hidden absolute top-12 right-4 bg-white shadow-lg text-black rounded-lg p-4 w-[200px]"
            >
              <div className="flex flex-col items-center justify-center">
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
                <LogoutLink>
                  <div className="flex items-center font-medium text-base gap-3 mt-10 cursor-pointer">
                    <RiLogoutCircleLine />
                    <p>Log out</p>
                  </div>
                </LogoutLink>
              </div>
            </div>
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

            <div
              id="userMenu"
              className="hidden absolute top-12 right-4 bg-white shadow-lg text-black rounded-lg p-4 w-[200px]"
            >
              <div className="flex flex-col items-center justify-center">
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
                <LogoutLink>
                  <div className="flex items-center font-medium text-base gap-3 mt-10 cursor-pointer">
                    <RiLogoutCircleLine />
                    <p>Log out</p>
                  </div>
                </LogoutLink>
              </div>
            </div>
          </div>
        )
      ) : (
        <RegisterLink>
          <button
            className={`text-[1.1rem] ${
              pathname === "/api/auth/join" && "opacity-0"
            } ${pathname === "/api/auth/login" && "opacity-0"} ${
              open && "opacity-0"
            } leading-5 ${offset >= 25 && "text-white"} ${
              pathname !== "/" && "text-white"
            }`}
          >
            Join
          </button>
        </RegisterLink>
      )}
    </div>
  );
}

export default SmallScreen;
