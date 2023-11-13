import connectDB from "@/utils/db";
import CreatorProfile from "@/models/creatorProfile";

export const POST = async (request: Request) => {
  const { image, location, userId } = await request.json();

  try {
    await connectDB();

    const newCreatorProfile = new CreatorProfile({
      image,
      location,
      userId,
    });

    await newCreatorProfile.save();

    return new Response(JSON.stringify(newCreatorProfile), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create user profile", { status: 400 });
  }
};
