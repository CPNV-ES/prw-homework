import express from "express";
import homeworkRoutes from "./src/routes/homeworks.js";
import subjectRoutes from "./src/routes/subjects.js";

const app = express();

app.use(express.json());

app.use("/homeworks", homeworkRoutes);
app.use("/subjects", subjectRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
