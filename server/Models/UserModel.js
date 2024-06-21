import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required!"],
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      required: [true, "Email is Required!"],
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
    },
    phone_number: {
      type: String,
      validate: [validator.isMobilePhone, "Please provide a valid phone number"],
      required: [true, "Phone number is Required!"],
    },
    address: {
      type: String,
      required: [true, "Address is Required!"],
    },
    date_of_birth: {
      type: Date,
      required: [true, "Date of Birth is Required!"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is Required!"],
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
      required: [true, "Role is Required!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
