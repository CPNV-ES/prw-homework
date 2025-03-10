import express from "express";
import homeworkRoutes from "./src/routes/homeworks.js";

const app = express();

app.use(express.json());

// Use the homework routes with a path prefix
app.use("/homeworks", homeworkRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
