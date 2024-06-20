import express from "express";
import { login, registration, signUp } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('/registration', registration);



export default router;