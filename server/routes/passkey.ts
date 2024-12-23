const express = require("express");
const PasskeyRouter = express.Router();

import {
  createPasskey,
  checkPasskey,
  updatePasskey,
} from "../controllers/passkey";

PasskeyRouter.post("/", createPasskey);
PasskeyRouter.post("/check/", checkPasskey);
PasskeyRouter.patch("/", updatePasskey);

export default PasskeyRouter;
