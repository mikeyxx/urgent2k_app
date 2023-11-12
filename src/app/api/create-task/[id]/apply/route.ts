import connectDB from "@/utils/db";
import Task from "@/models/task";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const task = await Task.find({ _id: params.id }).exec();

    if (!task) {
      throw new Error("Task not found");
    }

    return new Response(JSON.stringify(task), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch task", { status: 400 });
  }
};
