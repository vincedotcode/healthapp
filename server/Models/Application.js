import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
