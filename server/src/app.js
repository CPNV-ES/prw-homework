import express from "express";
import cors from "cors";
import homeworkRoutes from "./routes/homeworks.js";
import subjectRoutes from "./routes/subjects.js";
import stateRoutes from "./routes/states.js";

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use("/homeworks", homeworkRoutes);
app.use("/subjects", subjectRoutes);
app.use("/states", stateRoutes);

export default app;
