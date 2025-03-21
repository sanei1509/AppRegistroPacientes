import { Router } from "express";
import { registerPatient, getAllPatients } from "../controllers/patientController.js";

const router = Router();

router.post("/", registerPatient);
router.get("/", getAllPatients); 

export default router;