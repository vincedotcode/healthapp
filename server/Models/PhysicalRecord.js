import mongoose from "mongoose";

const physicalRecordSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    bmi: {
      type: Number,
    },
    body_fat_percentage: {
      type: Number,
    },
    muscle_mass: {
      type: Number,
    },
    water_percentage: {
      type: Number,
    },
    waist_circumference: {
      type: Number,
    },
    hip_circumference: {
      type: Number,
    },
    blood_pressure: {
      systolic: {
        type: Number,
      },
      diastolic: {
        type: Number,
      },
    },
    heart_rate: {
      type: Number,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PhysicalRecord", physicalRecordSchema);
