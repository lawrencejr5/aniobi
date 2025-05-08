import mongoose, { Schema, model } from "mongoose";

const LikeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Admins",
      required: true,
    },
    message: {
      type: Schema.Types.ObjectId,
      ref: "Messages",
      required: true,
    },
  },
  { timestamps: true }
);

const LikeModel = mongoose.model("Likes", LikeSchema);
export default LikeModel;
