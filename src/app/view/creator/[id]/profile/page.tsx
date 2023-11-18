import Profile from "@/components/creator/Profile";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="w-[1100px] pt-8 pb-6 max-w-full min-h-[calc(100vh-64px)] px-4 m-auto">
      <Profile user={user} />
    </div>
  );
}

export default Page;
