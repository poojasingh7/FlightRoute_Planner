import express from "express";
import { saveRoute, getRoutes, deleteRoute } from "../controllers/routeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveRoute);
router.get("/", protect, getRoutes);
router.delete("/:id", protect, deleteRoute);

export default router;