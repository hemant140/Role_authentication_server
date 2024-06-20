import { Router } from "express";
import { createPermission, getPermission } from "../controller/permission.controller.js";
import verifyToken from "../middleware/verifyToken.middleware.js";

const router = Router();

router.post("", verifyToken, createPermission);
router.get("", verifyToken, getPermission);


export default router;