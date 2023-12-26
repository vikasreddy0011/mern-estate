import express from "express";
import { Signin, signup,Google } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',Signin);
router.post('/google',Google);

export default router ;