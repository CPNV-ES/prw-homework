import express from "express";
import cors from "cors";
import homeworkRoutes from "./routes/homeworks.js";
import subjectRoutes from "./routes/subjects.js";
import stateRoutes from "./routes/states.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/homeworks", homeworkRoutes);
app.use("/subjects", subjectRoutes);
app.use("/states", stateRoutes);
app.use("/auth", authRoutes);

export default app;
