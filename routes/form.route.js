import express from "express";
import {
    addNewFormController, deleteFormController, getFormByIdController,
    getFormsPaginatedController, updateFormController
} from "../controllers/form.controller.js";



const router = express.Router();

router.post("/add", addNewFormController);
router.patch("/:id", updateFormController);
router.get("/get", getFormsPaginatedController);
router.delete("/:id", deleteFormController);
router.get("/:id", getFormByIdController);

export default router;