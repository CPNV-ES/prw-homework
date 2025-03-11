import express from "express";
import homeworkRoutes from "./routes/homeworks.js";
import subjectRoutes from "./routes/subjects.js";
import stateRoutes from "./routes/states.js";

const app = express();

app.use(express.json());

app.use("/homeworks", homeworkRoutes);
app.use("/subjects", subjectRoutes);
app.use("/states", stateRoutes);

export default app;
