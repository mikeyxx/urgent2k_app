import React from "react";
import Index from "./Index";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getCreatorProfile, getDBUser, getExecutorProfile } from "@/api";

async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let dbUser = null;
  let executorProfile = null;
  let creatorProfile = null;

  try {
    dbUser = await getDBUser(user?.id);
    executorProfile = await getExecutorProfile(user?.id);
    creatorProfile = await getCreatorProfile(user?.id);
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
  }

  return (
    <>
      <Index
        dbUser={dbUser}
        executorProfile={executorProfile}
        creatorProfile={creatorProfile}
        user={user}
      />
    </>
  );
}

export default Navbar;
