const express = require("express");
const PasskeyRouter = express.Router();

import { auth } from "../middlewares/auth";

import {
  createPasskey,
  checkPasskey,
  updatePasskey,
} from "../controllers/passkey";

PasskeyRouter.post("/", auth, createPasskey);
PasskeyRouter.post("/check/", checkPasskey);
PasskeyRouter.patch("/", auth, updatePasskey);

export default PasskeyRouter;
