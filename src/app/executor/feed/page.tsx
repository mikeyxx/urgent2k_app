import MyJobsCard from "@/components/executor/MyJobsCard";
import MyProposalsCard from "@/components/executor/MyProposalsCard";
import ProfileCard from "@/components/executor/ProfileCard";
import React from "react";
import { redirect } from "next/navigation";
import Feeds from "@/components/Feeds";
import { getUserProfile } from "@/api";
import { ExecutorProfileDocument } from "@/utils/lib";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data: ExecutorProfileDocument = await getUserProfile(user?.id);

  if (!user) {
    redirect("/api/auth/login?post_login_redirect_url=/executor/feed");
  }

  if (!data.bio) {
    redirect("/executor/update-profile");
  }

  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col pt-8 pb-6 w-full max-w-[1200px] m-auto px-6 lg:px-0">
      <div className="flex lg:flex-row gap-4 flex-col-reverse">
        <Feeds />

        <div className="flex flex-col gap-7">
          <ProfileCard />
          <MyJobsCard />
          <MyProposalsCard />
        </div>
      </div>
    </section>
  );
}

export default Page;
