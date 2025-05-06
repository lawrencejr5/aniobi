import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Admins",
      required: true,
    },
    message: {
      type: Schema.Types.ObjectId,
      ref: "Messages",
      required: true,

    }
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comments", CommentSchema);
export default CommentModel;
