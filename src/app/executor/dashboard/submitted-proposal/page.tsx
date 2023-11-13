import SubmittedProposal from "@/components/executor/SubmittedProposal";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <SubmittedProposal user={user} />
    </>
  );
}

export default Page;
