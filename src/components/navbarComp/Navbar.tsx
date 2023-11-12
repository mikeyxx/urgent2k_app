import React from "react";
import Index from "./Index";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getDBUser, getUserProfile } from "@/api";

async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let dbUser = null;
  let profile = null;

  try {
    dbUser = await getDBUser(user?.id);
    profile = await getUserProfile(user?.id);
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
  }

  return (
    <>
      <Index dbUser={dbUser} profile={profile} user={user} />
    </>
  );
}

export default Navbar;
