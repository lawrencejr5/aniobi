require("dotenv").config();

import express from "express";
const app = express();

import connectDb from "./config/conn";

// Middlewares
import notFound from "./middlewares/notFound";
const cors = require("cors");

// Routes
import MessageRouter from "./routes/messages";
import AdminRouter from "./routes/admin";
import CommentRouter from "./routes/comment";
import LikeRouter from "./routes/like";

app.use(express.json());
app.use(cors());

app.use("/api/v1/messages", MessageRouter);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/comment", CommentRouter);
app.use("/api/v1/like", LikeRouter);

app.use(notFound);

const startServer = async () => {
  const port: string = (process.env.PORT as string) || "5001";
  const url: string = process.env.MONGO_URI as string;
  try {
    await connectDb(url);
    app.listen(port, () => {
      console.log(`app listenting on  port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
