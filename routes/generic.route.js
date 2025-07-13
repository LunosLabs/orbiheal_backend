import express from "express";
import {addNewGenericController} from "../controllers/generic.controller.js";

const router = express.Router();

router.post("/add", addNewGenericController);

export default router;