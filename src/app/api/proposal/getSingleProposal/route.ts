import connectDB from "@/utils/db";
import Proposal from "@/models/proposal";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const taskId = searchParams.get("taskId");
  const executorId = searchParams.get("executorId");

  try {
    await connectDB();
    const res = await Proposal.find({ taskId, executorId })
      .populate("executorId")
      .exec();

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(`Received error: ${error}`, { status: 400 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const taskId = searchParams.get("taskId");
  const executorId = searchParams.get("executorId");
  try {
    await connectDB();

    await Proposal.findOneAndDelete({ taskId, executorId }).exec();

    return new Response("Proposal has been deleted successfully!");
  } catch (error) {
    return new Response(`Received error: ${error}`, { status: 400 });
  }
};
