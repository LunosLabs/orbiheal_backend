import express from "express";
import {
    addNewFormController, getFormByIdController,
    getFormsPaginatedController
} from "../controllers/form.controller.js";


const router = express.Router();

router.post("/add", addNewFormController);
router.get("/get", getFormsPaginatedController);
router.get("/:id", getFormByIdController);

export default router;