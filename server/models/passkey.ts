import mongoose from "mongoose";

const PasskeySchema = new mongoose.Schema(
  {
    passkey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PasskeyModel = mongoose.model("Passkey", PasskeySchema);
export default PasskeyModel;
