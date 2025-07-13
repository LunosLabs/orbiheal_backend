import express from 'express';
import {getUserByIdController} from "../controllers/user.controller.js";

const router = express.Router();

router.get('/:id', getUserByIdController)

export default router;