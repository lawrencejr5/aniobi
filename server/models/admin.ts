import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user","admin", "super"],
      default: "user",
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admins", AdminSchema);
export default AdminModel;
