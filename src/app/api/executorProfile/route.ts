import connectDB from "@/utils/db";
import Profile from "@/models/profile";

export const POST = async (request: Request) => {
  const {
    image,
    title,
    bio,
    categories,
    skills,
    rate,
    education,
    address,
    experiences,
    certifications,
    projects,
    phone,
    executorId,
  } = await request.json();

  try {
    await connectDB();

    const newUserProfile = new Profile({
      image,
      title,
      bio,
      categories,
      skills,
      rate,
      education,
      address,
      experiences,
      certifications,
      projects,
      phone,
      executorId,
    });

    await newUserProfile.save();

    return new Response(JSON.stringify(newUserProfile), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create user profile", { status: 400 });
  }
};
