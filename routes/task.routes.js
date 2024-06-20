import express from 'express';
import { UpdateTask, createTask, deleteTask, getAllTask, getTaskById } from '../controller/task.controller.js';
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

router.get('', getAllTask)
router.get('/:id', getTaskById)
router.post('', upload.single('image'), createTask)
router.put('/:id', upload.single('image'), UpdateTask)
router.delete('/:id', deleteTask)


export default router;