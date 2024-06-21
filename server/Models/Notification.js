import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    notification_type: {
      type: String,
      required: true,
    },
    sent_at: {
      type: Date,
      required: true,
    },
    read_at: {
      type: Date,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
