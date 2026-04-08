import express from "express";
import { getServiceDashboard, getAllServices } from "../controllers/serviceController.js";
import { protect, allowRoles } from "../middlleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/dashboard", protect, allowRoles("assistant"), getServiceDashboard);

export default router;