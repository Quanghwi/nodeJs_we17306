import express from "express";
import productRouter from "./routes/products.js";
import authRouter from "./routes/auth.js"
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'

const app = express();
dotenv.config();
const API_DB = process.env.API_DB
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000/'
}))

app.use("/api", productRouter);
app.use("/api", authRouter)

mongoose.connect(API_DB)


export const viteNodeApp = app;
