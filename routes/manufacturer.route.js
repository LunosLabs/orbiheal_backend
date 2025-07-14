import express from "express";
import {
  addNewManufacturerController,
  deleteManufacturerController,
  getManufacturerByIdController,
  getManufacturersPaginatedController,
  updateManufacturerController,
} from "../controllers/manufacturer.controller.js";

const router = express.Router();

router.post("/add", addNewManufacturerController); 
router.patch("/:id", updateManufacturerController);
router.get("/get", getManufacturersPaginatedController); 
router.delete("/:id", deleteManufacturerController);
router.get("/:id", getManufacturerByIdController);

export default router;
