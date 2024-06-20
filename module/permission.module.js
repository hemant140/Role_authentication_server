import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    permissionName: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;