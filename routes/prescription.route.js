import express from 'express';
import {aiPrescriptionScanController} from "../controllers/prescrition.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });


const router = express.Router();

router.post("/scan", upload.single("image"), aiPrescriptionScanController);


export default router;