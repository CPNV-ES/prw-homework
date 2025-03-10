import express from "express";
import {
  createHomework,
  getAllHomework,
  getHomeworkById,
  updateHomework,
  deleteHomework,
} from "../services/HomeworkService.js";

const router = express.Router();

// Route to create a new homework
router.post("/", async (req, res) => {
  try {
    const { title, description, deadline, subjectId } = req.body;
    const newHomework = await createHomework(
      title,
      description,
      deadline,
      subjectId
    );
    res.status(201).json(newHomework);
  } catch (error) {
    res.status(500).json({ error: "Failed to create homework" });
  }
});

// Route to get all homework
router.get("/", async (req, res) => {
  try {
    const homeworks = await getAllHomework();
    res.status(200).json(homeworks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homeworks" });
  }
});

// Route to get a homework by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const homework = await getHomeworkById(parseInt(id));
    if (homework) {
      res.status(200).json(homework);
    } else {
      res.status(404).json({ error: "Homework not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homework" });
  }
});

// Route to update a homework by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, subjectId } = req.body;
    const updatedHomework = await updateHomework(
      parseInt(id),
      title,
      description,
      deadline,
      subjectId
    );
    res.status(200).json(updatedHomework);
  } catch (error) {
    res.status(500).json({ error: "Failed to update homework" });
  }
});

// Route to delete a homework by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHomework = await deleteHomework(parseInt(id));
    res.status(200).json(deletedHomework);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete homework" });
  }
});

export default router;
