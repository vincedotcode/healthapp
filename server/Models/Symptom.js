import mongoose from "mongoose";

const symptomAnalysisSchema = new mongoose.Schema(
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
    severity: {
      type: String,
      required: true,
    },
    recommendations: {
      type: String,
    },
    follow_up_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SymptomAnalysis", symptomAnalysisSchema);
