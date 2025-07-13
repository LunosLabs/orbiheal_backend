import express from "express";
import {
    addNewGenericController,
    getGenericByIdController,
    getGenericPaginatedController
} from "../controllers/generic.controller.js";

const router = express.Router();

router.post("/add", addNewGenericController);
router.get("/get", getGenericPaginatedController);
router.get("/:id", getGenericByIdController);

export default router;