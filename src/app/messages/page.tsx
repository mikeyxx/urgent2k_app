import React from "react";

import { redirect } from "next/navigation";
import { getDBUser } from "@/api";
import Messaging from "@/components/chat/Messaging";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = await getDBUser(user?.id);

  const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://urgent2k-app.vercel.app"

  if (!user) {
    redirect(`${baseUrl}/api/auth/login?post_login_redirect_url=/messages`);
  }

  return (
    <section className="flex-center h-[calc(100vh-64px)]">
      <Messaging user={user} dbUser={dbUser} />
    </section>
  );
}

export default Page;
