import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";

interface Location {
  city: string;
  country: string;
}

interface CreatorProfileDocument extends Document {
  image: string;
  location: Location;
  userId: string;
}

const creatorProfileSchema = new Schema<CreatorProfileDocument>(
  {
    image: String,
    location: {
      city: String,
      country: String,
    },
    userId: {
      type: String,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CreatorProfile =
  models.CreatorProfile || model("CreatorProfile", creatorProfileSchema);
export default CreatorProfile as Model<CreatorProfileDocument>;
