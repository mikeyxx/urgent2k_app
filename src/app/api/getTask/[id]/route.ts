import Task from "@/models/task";
import connectDB from "@/utils/db";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const tasks = await Task.find({ creatorId: params.id })
      .populate("creatorId")
      .exec();

    if (!tasks)
      return new Response("User has not created task", {
        status: 404,
      });

    return new Response(JSON.stringify(tasks), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch tasks", { status: 400 });
  }
};
