import express from "express";
import { submitAppointment, fetchAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", submitAppointment);
router.get("/", fetchAppointments);

export default router;