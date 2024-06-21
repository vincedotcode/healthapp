import mongoose from "mongoose";

const nutritionPlanSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan_data: {
      type: String,
      required: true,
    },
    dietary_restrictions: {
      type: String,
    },
    goals: {
      type: String,
    },
    progress_tracking: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("NutritionPlan", nutritionPlanSchema);
