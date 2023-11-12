import connectDB from "@/utils/db";
import Task from "@/models/task";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const task = await Task.findById(params.id);

    if (!task) return new Response("Task not found", { status: 404 });

    const { messaged, hired } = await request.json();

    if (messaged) {
      const isUserInMessaged = task.messaged.some(
        (user) => user.userId === messaged.userId
      );

      if (!isUserInMessaged) {
        const messagedUser = {
          userId: messaged.userId,
          name: messaged.name,
          image: messaged.image,
        };

        task.messaged.push(messagedUser);
      }
    }

    if (hired) {
      const isUserInHired = task.hired.some(
        (user) => user.userId === hired.userId
      );

      if (!isUserInHired) {
        const hiredUser = {
          userId: hired.userId,
          name: hired.name,
          image: hired.image,
        };

        task.hired.push(hiredUser);
      }
    }

    await task.save();

    return new Response("Task has been updated", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update task", { status: 400 });
  }
};
