import connectDB from "@/utils/db";
import Proposal from "@/models/proposal";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const res = await Proposal.findById(params.id).exec();

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(`Received error: ${error}`, { status: 400 });
  }
};
