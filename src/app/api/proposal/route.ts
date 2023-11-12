import connectDB from "@/utils/db";
import Proposal from "@/models/proposal";

export const POST = async (request: Request) => {
  const {
    hourlyRate,
    fixedRate,
    coverLetter,
    attachment,
    taskId,
    executorId,
    isAccepted,
  } = await request.json();

  try {
    await connectDB();

    const newProposal = new Proposal({
      hourlyRate,
      fixedRate,
      coverLetter,
      attachment,
      taskId,
      executorId,
      isAccepted,
    });

    await newProposal.save();

    return new Response(JSON.stringify(newProposal), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a proposal", { status: 400 });
  }
};
