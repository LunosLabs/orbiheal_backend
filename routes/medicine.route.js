import express from "express";
import {
  addNewMedicineController, getMedicineByIdAdminController, getMedicineByIdController, getMedicinesPaginatedController, searchMedicineController,
} from "../controllers/medicine.controller.js";

const router = express.Router();

router.post("/add", addNewMedicineController);
// router.patch("/update/:id", updateMedicineController);
router.get("/get", getMedicinesPaginatedController)
router.get("/search", searchMedicineController);
router.get("/dashboard/:id", getMedicineByIdController)

router.get("/:id", getMedicineByIdAdminController);

export default router;
