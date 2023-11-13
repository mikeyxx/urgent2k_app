import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";

interface JobExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
}

interface Address {
  country: string;
  city: string;
  town: string;
  street: string;
}

interface Certifications {
  title: string;
  org: string;
  date: string;
}

interface Projects {
  link: string;
  image: string;
  title: string;
}
interface ProfileDocument extends Document {
  image: string;
  title: string;
  bio: string;
  categories: string[];
  skills: string[];
  rate: number;
  experiences: JobExperience[];
  education: Education;
  address: Address;
  certifications: Certifications[];
  projects: Projects[];
  phone: string;
  executorId: string;
}

const profileSchema = new Schema<ProfileDocument>(
  {
    image: String,
    title: {
      type: String,
    },
    bio: {
      type: String,
    },
    categories: {
      type: [String],
    },
    skills: {
      type: [String],
    },
    rate: {
      type: Number,
    },
    experiences: [
      {
        jobTitle: String,
        company: String,
        startDate: String,
        endDate: String,
        location: String,
      },
    ],
    education: {
      type: Object,
    },
    address: {
      type: Object,
    },
    certifications: [
      {
        title: String,
        org: String,
        date: String,
      },
    ],
    projects: [
      {
        link: String,
        image: String,
        title: String,
      },
    ],
    phone: String,
    executorId: {
      type: String,
      ref: "User",
    },
  },

  { timestamps: true }
);

const Profile = models.Profile || model("Profile", profileSchema);

export default Profile as Model<ProfileDocument>;
