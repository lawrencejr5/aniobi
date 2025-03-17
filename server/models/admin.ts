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
      enum: ["admin", "super"],
      default: "admin",
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admins", AdminSchema);
export default AdminModel;
