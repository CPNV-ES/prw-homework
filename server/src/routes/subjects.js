import express from "express";
import SubjectService from "../services/SubjectService.js";

const router = express.Router();
const service = new SubjectService();

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newSubject = await service.createSubject(name);
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subject" });
  }
});

router.get("/", async (req, res) => {
  try {
    const subjects = await service.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await service.getSubjectById(parseInt(id));
    if (subject) {
      res.status(200).json(subject);
    } else {
      res.status(404).json({ error: "Subject not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subject" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedSubject = await service.updateSubject(parseInt(id), name);
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subject" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await service.deleteSubject(parseInt(id));
    res.status(200).json(deletedSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subject" });
  }
});

export default router;
