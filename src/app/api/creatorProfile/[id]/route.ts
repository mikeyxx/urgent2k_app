import connectDB from "@/utils/db";
import CreatorProfile from "@/models/creatorProfile";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const profile = await CreatorProfile.find({ userId: params.id })
      .populate("userId")
      .exec();

    if (!profile)
      return new Response("Profile has not been created", {
        status: 404,
      });

    return new Response(JSON.stringify(profile), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch user profile", { status: 400 });
  }
};
