import express from "express";
import {
  bookAppointment,
  completeAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book", bookAppointment);
router.put("/complete/:id", completeAppointment);

export default router;