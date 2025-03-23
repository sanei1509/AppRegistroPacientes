import { Router } from "express";
import { registerPatient, getAllPatients, deletePatient, updatePatient } from "../controllers/patientController.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post('/', upload.single('photoUrl'), registerPatient);
router.get("/", getAllPatients); 
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;