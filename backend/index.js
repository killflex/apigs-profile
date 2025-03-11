import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import productRoutes from "./routes/productRoutes.js";

config();

const app = express();

app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

mongoose
  .connect(process.env.mongoDb)
  .then(() => console.log("Database is connected"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/product", productRoutes);
