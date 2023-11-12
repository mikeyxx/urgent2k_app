import connectDB from "@/utils/db";
import Proposal from "@/models/proposal";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  // const searchParams = request.nextUrl.searchParams;
  // const executorId = searchParams.get("executorId");
  try {
    await connectDB();
    const res = await Proposal.find({
      executorId: params.id,
      isAccepted: true,
    })
      .populate("executorId")
      .exec();

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(`Received error: ${error}`, { status: 400 });
  }
};
