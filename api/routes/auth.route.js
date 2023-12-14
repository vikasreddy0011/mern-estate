import express from "express";
import { Signin, signup } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',Signin);

export default router ;