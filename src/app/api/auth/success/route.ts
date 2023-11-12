import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user == null || !user.id) {
    throw new Error("something went wrong with authentication" + user);
  }

  // check if user exists in the database
  const dbUser = await User.findOne({
    email: user.email,
  });

  // if not, create a new user
  if (!dbUser) {
    await User.create({
      _id: user.id,
      email: user.email,
      name: user.given_name,
    });
  }

  // Check if user chat has been initialized in firebase
  const res = await getDoc(doc(db, "conversations", user.id));

  if (!res.exists()) {
    await setDoc(doc(db, "conversations", user.id), {});
  }

  if (!dbUser?.role) {
    return NextResponse.redirect("http://localhost:3000/user/role");
  }

  if (dbUser?.role === "creator") {
    return NextResponse.redirect("http://localhost:3000/creator/active-tasks");
  } else {
    return NextResponse.redirect("http://localhost:3000/executor/feed");
  }
}
