import React from "react";
// import Welcome from "@/components/executor/Welcome";
import { redirect } from "next/navigation";
// import { getDBUser, getExecutorProfile } from "@/api";
// import { ExecutorProfileDocument } from "@/utils/lib";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProfileEditor from "@/components/executor/ProfileEditor";

async function Executor() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // const data: ExecutorProfileDocument = await getExecutorProfile(user?.id);
  // const dbUser = await getDBUser(user?.id);

  const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://urgent2k-app.vercel.app"

  if (!user) {
    redirect(
      `${baseUrl}/api/auth/login?post_login_redirect_url=/executor/update-profile`
    );
  }

  return (
    <section className="w-[1200px] min-h-[calc(100vh-64px)] pt-8 max-w-full px-4 pb-5 flex items-center m-auto">
      <ProfileEditor user={user} />
    </section>
  );
}

export default Executor;
