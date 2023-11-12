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
  } = await request.json();

  try {
    await connectDB();
  } catch (error) {}
};
