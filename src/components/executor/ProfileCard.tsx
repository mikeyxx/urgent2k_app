import React from "react";
import Image from "next/image";
import { ExecutorProfileDocument } from "@/utils/lib";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getExecutorProfile } from "@/api";

async function ProfileCard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data: ExecutorProfileDocument = await getExecutorProfile(user?.id);
  return (
    <div className="border flex items-center flex-col p-5 rounded-lg lg:w-[280px]">
      <Image
        src={user?.picture || data?.image || ""}
        alt="my avatar"
        width={80}
        height={80}
        className="rounded-full w-[80px] h-[80px] object-cover"
      />
      <div className="mt-4 text-center">
        <p className="underline">{user?.given_name}</p>

        <p className="lg:text-sm">
          <strong>{data?.title}</strong> - {data?.skills[0]}, {data?.skills[1]}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
