import express from "express";
import {
  addNewMedicineController,
  getMedicineByIdController,
    searchMedicineController,
  updateMedicineController,
} from "../controllers/medicine.controller.js";

const router = express.Router();

router.post("/add", addNewMedicineController);
router.patch("/update/:id", updateMedicineController);
router.get("/search", searchMedicineController);
router.get("/:id", getMedicineByIdController);

export default router;
