import { Router } from "express";
import { createUser, getAllUsers, updateUsers } from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.middleware.js";

const router = Router();

router.get('', verifyToken, getAllUsers);
router.put('', verifyToken, updateUsers);
router.post('', verifyToken, createUser);


export default router;