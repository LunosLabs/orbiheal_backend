import express from 'express';
import {aiFetchMedicineController} from "../controllers/orbiheal.controller.js";

const router = express.Router();

router.post("/add",aiFetchMedicineController);


export default router;