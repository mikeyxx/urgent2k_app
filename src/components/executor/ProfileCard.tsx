import React from "react";
import Image from "next/image";
import { ExecutorProfileDocument } from "@/utils/lib";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getExecutorProfile } from "@/api";

async function getUser(executorId: string | undefined) {
  const res = await fetch(
    `http://localhost:3000/api/getProfileInfo/${executorId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch executor data");
  }

  return res.json();
}

async function ProfileCard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data: ExecutorProfileDocument[] = await getExecutorProfile(user?.id);
  return (
    <div className="border flex items-center flex-col p-5 rounded-lg lg:w-[280px]">
      <Image
        src={user?.picture || data[0].image || ""}
        alt="my avatar"
        width={80}
        height={80}
        className="rounded-full w-[80px] h-[80px] object-cover"
      />
      <div className="mt-4 text-center">
        <p className="underline">{user?.given_name}</p>

        <p className="lg:text-sm">
          <strong>{data[0].title}</strong> - {data[0].skills[0]},{" "}
          {data[0].skills[1]}, {data[0].skills[2]}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
