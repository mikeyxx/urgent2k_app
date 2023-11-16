"use client";

import { ResetStateAction, useChatContext } from "@/context/ChatContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { CreatorProfileDocument, DBUser } from "@/utils/lib";
import { getCreatorProfile } from "@/api";

interface ActiveChatHeaderProps {
  user: any;
  dbUser: DBUser;
}

function ActiveChatHeader({ user, dbUser }: ActiveChatHeaderProps) {
  const [creatorProfile, setCreatorProfile] = useState<
    CreatorProfileDocument[] | null
  >(null);
  const router = useRouter();
  const { state } = useChatContext();

  const viewUserProfile = (id: string) => {
    if (dbUser.role === "executor") {
      router.push(`/view/creator/${id}/profile`);
    } else {
      router.push(`/view/applicant/${id}/profile`);
    }
  };

  const { dispatch } = useChatContext();

  const handleResetState = () => {
    const resetStateAction: ResetStateAction = {
      type: "RESET_STATE",
    };
    dispatch(resetStateAction);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getCreatorProfile(state.user.userId);

      setCreatorProfile(data);
    };

    getData();
  }, [state.user.userId]);

  return (
    <div className="flex items-center bg-b/25 h-[50px] p-[10px] text-e">
      <HiMiniArrowLongLeft
        onClick={handleResetState}
        className="xl:hidden font-bold text-xl cursor-pointer"
      />

      <div className="relative border border-white rounded-full max-xl:ml-4">
        <Image
          src={
            state?.user?.photo ||
            creatorProfile?.[0]?.image ||
            "/no-profile-icon.png"
          }
          alt="User avatar"
          width={30}
          height={30}
          className="rounded-full w-[30px] h-[30px] object-cover"
        />
        <span className="absolute w-[7px] h-[7px] top-0 right-0 bg-primary rounded-full"></span>
      </div>
      <div className="ml-2">
        <p
          className="text-sm hover:underline cursor-pointer"
          onClick={() => viewUserProfile(state?.user?.userId)}
        >
          {state.user.name}
        </p>
      </div>
    </div>
  );
}

export default ActiveChatHeader;
