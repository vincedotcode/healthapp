import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    record_type: {
      type: String,
      required: true,
      enum: ["Diagnosis", "Treatment", "Prescription", "Lab Result", "Follow-up"], 
    },
    description: {
      type: String,
      required: true,
    },
    record_data: {
      type: String,
      required: true,
    },
    attachment_path: {
      type: String,
    },
    follow_up_date: {
      type: Date,
    },
    symptoms: {
      type: String,
    },
    treatment: {
      type: String,
    },
    medication_prescribed: {
      type: String,
    },
    lab_results: {
      type: String,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Reviewed", "Completed"], 
    },
    reviewed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HealthRecord", healthRecordSchema);
