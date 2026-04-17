import express from "express";
import { getFlightRoute } from "../controllers/flightController.js";

const router = express.Router();

router.get("/", getFlightRoute);

export default router;