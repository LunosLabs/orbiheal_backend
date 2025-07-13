import express from "express";
import {addNewFormController} from "../controllers/form.controller.js";

const router = express.Router();

router.post("/add", addNewFormController);

export default router;