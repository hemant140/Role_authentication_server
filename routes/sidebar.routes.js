import { Router } from "express";
import { createSidebar, getSidebar } from "../controller/sidebar.controller.js";
import verifyToken from "../middleware/verifyToken.middleware.js";

const router = Router();

router.get('', verifyToken, getSidebar)
router.post('', verifyToken, createSidebar)


export default router;