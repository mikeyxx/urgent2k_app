import connectDB from "@/utils/db";
import Profile from "@/models/profile";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const profile = await Profile.find({ executorId: params.id })
      .populate("executorId")
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

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
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

    const profile = await Profile.findById(params.id);
    if (!profile) return new Response("User not found", { status: 404 });

    // Update properties conditionally
    if (image) profile.image = image;
    if (title) profile.title = title;
    if (bio) profile.bio = bio;

    // Update categories array if new values are provided
    if (categories && categories.length > 0) {
      profile.categories = profile.categories.concat(
        categories.filter(
          (category: string) => !profile.categories.includes(category)
        )
      );
    }

    // Update skills array if new values are provided
    if (skills && skills.length > 0) {
      profile.skills = profile.skills.concat(
        skills.filter((skill: string) => !profile.skills.includes(skill))
      );
    }

    if (experiences) {
      for (const experience of experiences) {
        const isExperienceInArray = profile.experiences.some(
          (exp) => exp.company === experience.company
        );

        if (!isExperienceInArray) {
          profile.experiences.push(experience);
        }
      }
    }

    if (certifications) {
      for (const certification of certifications) {
        const isCerticationInArray = profile.certifications.some(
          (cert) => cert.title === certification.title
        );

        if (!isCerticationInArray) {
          profile.certifications.push(certification);
        }
      }
    }

    if (projects) {
      for (const project of projects) {
        const isProjectInArray = profile.projects.some(
          (p) => p.title === project.title
        );

        if (!isProjectInArray) {
          profile.projects.push(project);
        }
      }
    }

    if (rate) profile.rate = rate;
    if (education) profile.education = education;
    if (address) profile.address = address;
    if (phone) profile.phone = phone;

    await profile.save();

    return new Response("User profile created", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create user profile", { status: 400 });
  }
};
