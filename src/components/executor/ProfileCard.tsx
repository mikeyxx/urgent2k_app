import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import Image from "next/image";
import { ExecutorProfileDocument } from "@/utils/executor";

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
  const session = await getServerSession(authOptions);
  const data: ExecutorProfileDocument = await getUser(session?.user.id);
  return (
    <div className="border flex items-center flex-col p-5 rounded-lg lg:w-[280px]">
      <Image
        src={session?.user.image ?? ""}
        alt="my avatar"
        width={80}
        height={80}
        className="rounded-full w-[80px] h-[80px] object-cover"
      />
      <div className="mt-4 text-center">
        <p className="underline">{session?.user.name}</p>

        <p className="lg:text-sm">
          <strong>{data.title}</strong> - {data.skills[0]}, {data.skills[1]},{" "}
          {data.skills[2]}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
