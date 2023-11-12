import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import ProfileEditor from "@/components/executor/ProfileEditor";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/login?callbackUrl=/executor/create-profile");
  }

  return (
    <section className="w-[1200px] min-h-[calc(100vh-64px)] pt-8 max-w-full px-4 pb-5 flex items-center m-auto">
      <ProfileEditor />
    </section>
  );
}

export default Page;
