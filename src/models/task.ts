import { models, model, Model } from "mongoose";
import { Document, Schema } from "mongoose";

interface TaskDocument extends Document {
  title: string;
  description: string;
  img: string;
  docFile: string;
  filename: string;
  categories: string[];
  skills: string[];
  budget: string;
  experience: "Beginner" | "Intermidiate" | "Expert";
  pricing: "Hourly" | "Fixed rate";
  payRate: string;
  duration:
    | "&lt; than one month"
    | "&lt; than three months"
    | "&lt; than six months";
  timeRequirement: string;
  creatorId: string;
  messaged: [
    {
      userId: String;
      name: string;
      image: string;
    }
  ];
  hired: [
    {
      userId: String;
      name: string;
      image: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument, {}>(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },

    description: {
      type: String,
      required: true,
    },
    img: String,
    docFile: String,
    filename: String,
    categories: {
      type: [String],
    },
    skills: {
      type: [String],
      required: true,
    },
    budget: {
      type: String,
    },
    experience: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
      required: true,
    },
    pricing: {
      type: String,
      enum: ["Hourly", "Fixed rate"],
    },
    payRate: String,
    duration: {
      type: String,
      enum: [
        "Less than one month",
        "Less than three months",
        "Less than six months",
      ],
      required: true,
    },
    timeRequirement: String,
    creatorId: {
      type: String,
      ref: "User",
    },
    messaged: [
      {
        userId: String,
        name: String,
        image: String,
      },
    ],
    hired: [
      {
        userId: String,
        name: String,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

const Task = models.Task || model("Task", taskSchema);

export default Task as Model<TaskDocument, {}>;
