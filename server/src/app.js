import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import homeworkRoutes from "./routes/homeworks.js";
import subjectRoutes from "./routes/subjects.js";
import stateRoutes from "./routes/states.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/homeworks", homeworkRoutes);
app.use("/subjects", subjectRoutes);
app.use("/states", stateRoutes);
app.use("/auth", authRoutes);

export default app;
