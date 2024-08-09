import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  mongoose.connect(
    (process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    () => {
      console.log("Connected to MongoDB");
    }
  );

  console.log("Server is running on port:", port);
});
