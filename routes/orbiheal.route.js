import express from 'express';
import {orbiAddMedicineController} from "../controllers/orbiheal.controller.js";


const router = express.Router();

router.post("/add/:entity", orbiAddMedicineController);

export default router;