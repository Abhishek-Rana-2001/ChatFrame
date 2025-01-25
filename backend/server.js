import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { app,server } from "./lib/socket.js";

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))
dotenv.config();
const port = process.env.PORT;

// packages configuration
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())

// API routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

server.listen(port, () => {
  console.log(`Server running on port :- ${port}`);
  connectDB();
});
