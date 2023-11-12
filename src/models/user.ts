import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  _id: string;
  email: string;
  name: string;
  role: "creator" | "executor";
}

const userSchema = new Schema<UserDocument>(
  {
    _id: String,
    email: {
      type: String,
      required: [true, "Please provide an email!"],
      unique: true,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      enum: ["creator", "executor"],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User as Model<UserDocument>;
