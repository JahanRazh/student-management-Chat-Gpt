import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    course: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 }
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);