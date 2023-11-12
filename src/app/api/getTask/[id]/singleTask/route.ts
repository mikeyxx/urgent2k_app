import Task from "@/models/task";
import connectDB from "@/utils/db";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const tasks = await Task.findById(params.id).populate("creatorId").exec();

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
