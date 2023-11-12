import SubmittedProposal from "@/components/executor/SubmittedProposal";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";

async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <SubmittedProposal session={session} />
    </>
  );
}

export default Page;
