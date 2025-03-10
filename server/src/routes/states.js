import express from "express";
import StateService from "../services/StateService.js";

const router = express.Router();
const service = new StateService();

router.post("/", async (req, res) => {
  try {
    const { name, color, icon } = req.body;
    const newState = await service.createState(name, color, icon);
    res.status(201).json(newState);
  } catch (error) {
    res.status(500).json({ error: "Failed to create state" });
  }
});

router.get("/", async (req, res) => {
  try {
    const states = await service.getAllStates();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch states" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const state = await service.getStateById(parseInt(id));
    if (state) {
      res.status(200).json(state);
    } else {
      res.status(404).json({ error: "State not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch state" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, icon } = req.body;
    const updatedState = await service.updateState(
      parseInt(id),
      name,
      color,
      icon
    );
    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({ error: "Failed to update state" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedState = await service.deleteState(parseInt(id));
    res.status(200).json(deletedState);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete state" });
  }
});

export default router;
