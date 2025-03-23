import { Router } from "express";
import { registerPatient, getAllPatients, deletePatient, updatePatient } from "../controllers/patientController.js";

const router = Router();

router.post("/", registerPatient);
router.get("/", getAllPatients); 
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;