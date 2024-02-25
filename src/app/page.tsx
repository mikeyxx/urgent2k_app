import { getDBUser } from "@/api";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Homepage from "@/components/Homepage";
import UserTypes from "@/components/UserTypes";
import { DBUser } from "@/utils/lib";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser: DBUser = await getDBUser(user?.id);

  const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://urgent2k-app.vercel.app"

  if (user && dbUser.role === "creator") {
    redirect(`${baseUrl}/creator/active-tasks`);
  }
  if (user && dbUser.role === "executor") {
    redirect(`${baseUrl}/executor/feed`);
  }
  return (
    <section>
      <div className="flex flex-col min-h-[calc(100vh-64px)] w-[85%] m-auto mb-16 overflow-hidden">
        <Homepage />
        <UserTypes />
        <Feature />
      </div>
      <Footer />
    </section>
  );
}
