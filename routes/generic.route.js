import express from "express";
import {
    addNewGenericController, deleteGenericController,
    getGenericByIdController,
    getGenericPaginatedController, updateGenericController
} from "../controllers/generic.controller.js";

const router = express.Router();

router.post("/add", addNewGenericController);
router.patch("/:id", updateGenericController);
router.get("/get", getGenericPaginatedController);
router.delete("/delete/:id", deleteGenericController);
router.get("/:id", getGenericByIdController);

export default router;