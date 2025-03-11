import express from "express";
import HomeworkService from "../services/HomeworkService.js";

const router = express.Router();
const service = new HomeworkService();

router.post("/", async (req, res) => {
  try {
    const { title, description, deadline, subjectId } = req.body;
    const newHomework = await service.createHomework(
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

router.get("/", async (req, res) => {
  try {
    const homeworks = await service.getAllHomework();
    res.status(200).json(homeworks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homeworks" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const homework = await service.getHomeworkById(parseInt(id));
    if (homework) {
      res.status(200).json(homework);
    } else {
      res.status(404).json({ error: "Homework not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homework" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, subjectId } = req.body;
    const updatedHomework = await service.updateHomework(
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHomework = await service.deleteHomework(parseInt(id));
    res.status(200).json(deletedHomework);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete homework" });
  }
});

export default router;
