import { models, model, Model } from "mongoose";
import { Document, Schema } from "mongoose";

interface ProposalDocument extends Document {
  hourlyRate: string;
  fixedRate: string;
  coverLetter: string;
  attachment: string;
  taskId: string;
  executorId: any;
  isAccepted: boolean;
}

export const proposalSchema = new Schema<ProposalDocument, {}>({
  hourlyRate: String,
  fixedRate: String,
  coverLetter: {
    type: String,
    required: true,
  },
  attachment: String,
  taskId: {
    type: String,
    required: true,
  },
  executorId: {
    type: String,
    ref: "User",
    // unique: true
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

const Proposal = models.Proposal || model("Proposal", proposalSchema);
export default Proposal as Model<ProposalDocument, {}>;
