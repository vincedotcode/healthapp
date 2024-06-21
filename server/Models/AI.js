import mongoose from "mongoose";

const aiAnalysisSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    analysis_date: {
      type: Date,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    ai_model_version: {
      type: String,
      required: true,
    },
    confidence_score: {
      type: Number,
      required: true,
    },
    recommended_actions: {
      type: String,
      required: true,
    },
    doctor_reviewed: {
      type: Boolean,
      required: true,
    },
    doctor_comments: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AIAnalysis", aiAnalysisSchema);
