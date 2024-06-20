import mongoose from "mongoose";

const taskLoggers = new mongoose.Schema({
    method: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Logger = mongoose.model('TaskLogger', taskLoggers);

export default Logger;