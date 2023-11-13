"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import LargeScreen from "./LargeScreen";
import SmallScreen from "./SmallScreen";
import MediumScreen from "./MediumScreen";
import {
  CreatorProfileDocument,
  DBUser,
  ExecutorProfileDocument,
} from "@/utils/lib";

interface NavbarProps {
  dbUser: DBUser;
  executorProfile: ExecutorProfileDocument[];
  creatorProfile: CreatorProfileDocument[];
  user: any;
}

function Index({ dbUser, executorProfile, creatorProfile, user }: NavbarProps) {
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.scrollY);
    };
  }, []);

  return (
    <>
      <nav
        className={`font-semibold text-2xl px-4 h-16 z-10 sticky inset-x-0 top-0 w-full m-auto flex-center ${
          pathname !== "/" && "bg-primary text-white"
        } ${offset >= 25 && "bg-primary text-white transition duration-300"}`}
      >
        <div className="w-[95%] max-w-[1700px] m-auto flex-center">
          {/* For small screens */}
          <SmallScreen
            open={open}
            setOpen={setOpen}
            offset={offset}
            dbUser={dbUser}
            executorProfile={executorProfile}
            creatorProfile={creatorProfile}
            user={user}
          />
          {/* For medium screens */}
          <MediumScreen
            open={open}
            setOpen={setOpen}
            offset={offset}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            dbUser={dbUser}
            executorProfile={executorProfile}
            creatorProfile={creatorProfile}
            user={user}
          />
          {/* For large screens */}
          <LargeScreen
            offset={offset}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            dbUser={dbUser}
            executorProfile={executorProfile}
            creatorProfile={creatorProfile}
            user={user}
          />
        </div>
      </nav>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}

export default Index;
