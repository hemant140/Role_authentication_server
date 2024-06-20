import { Router } from "express";
import { createRole, getRole } from "../controller/role.controller.js";
import verifyToken from "../middleware/verifyToken.middleware.js";

const router = Router();

router.get('', verifyToken, getRole)
router.post('', verifyToken, createRole)


export default router;