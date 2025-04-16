import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: { type: String, default: "" },
    dueDate: { type: Date, default: null },
    points: { type: Number, default: 100 }
  },
  { collection: "assignments" }
);

export default assignmentSchema;