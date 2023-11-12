import connectDB from "@/utils/db";
import Task from "@/models/task";
import { NextRequest } from "next/server";

export const POST = async (request: Request) => {
  const {
    title,
    description,
    img,
    docFile,
    filename,
    categories,
    skills,
    budget,
    experience,
    pricing,
    payRate,
    duration,
    timeRequirement,
    creatorId,
  } = await request.json();

  try {
    await connectDB();

    const newTask = new Task({
      title,
      description,
      img,
      docFile,
      filename,
      categories,
      skills,
      budget,
      experience,
      pricing,
      payRate,
      duration,
      timeRequirement,
      creatorId,
    });

    await newTask.save();

    return new Response(JSON.stringify(newTask), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new task", { status: 400 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const tasks = await Task.find({});

    if (!tasks) {
      throw new Error("No task available");
    }

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch tasks", { status: 400 });
  }
};
