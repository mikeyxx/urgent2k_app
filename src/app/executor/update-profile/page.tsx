import React from "react";
import Welcome from "@/components/executor/Welcome";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/api";
import { ExecutorProfileDocument } from "@/utils/executor";
import ProfileEditor from "@/components/executor/ProfileEditor";

async function Executor() {
  const session = await getServerSession(authOptions);
  const data: ExecutorProfileDocument = await getUser(session?.user.id);

  if (!session) {
    redirect("/api/auth/login?callbackUrl=/executor/create-profile");
  }

  return (
    <section className="w-[1200px] min-h-[calc(100vh-64px)] pt-8 max-w-full px-4 pb-5 flex items-center m-auto">
      {data.bio ? <ProfileEditor /> : <Welcome />}
    </section>
  );
}

export default Executor;
