import connectDB from "@/utils/db";
import User from "@/models/user";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const user = await User.findById(params.id);
    if (!user)
      return new Response("user has not been created", {
        status: 404,
      });

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch user profile", { status: 400 });
  }
};

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { role } = await request.json();

  try {
    await connectDB();

    const user = await User.findById(params.id);

    if (!user) return new Response("User not found", { status: 404 });

    user.role = role;

    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to update user", { status: 400 });
  }
}
