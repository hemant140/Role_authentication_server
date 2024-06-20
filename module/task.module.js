import mongoose from "mongoose";
import { PRIORITY } from "../enum/enum.js";

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    label: {
        type: String,
        required: true
    },
    assigned: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        default: PRIORITY.NONE
    },
    image: {
        type: String,
    }

}, { timestamps: true });

const Task = mongoose.model('TaskUpload', taskSchema);

export default Task;

