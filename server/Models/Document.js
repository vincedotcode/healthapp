import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    document_type: {
      type: String,
      enum: [
        "National ID",
        "Medical License",
        "Proof of Address",
        "CV",
        "Passport",
        "Proof of Qualifications",
      ],
      required: true,
    },
    document_path: {
      type: String,
      required: true,
    },
    uploaded_at: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verification_comments: {
      type: String,
    },
  },
  { _id: false }
);

const doctorDocumentSchema = new mongoose.Schema(
  {
    application_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    documents: {
      type: [documentSchema],
      validate: [arrayLimit, '{PATH} exceeds the limit of 10']
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 10;
}

export default mongoose.model("DoctorDocument", doctorDocumentSchema);
