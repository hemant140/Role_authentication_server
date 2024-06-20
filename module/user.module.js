import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
    },
    orgId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        default: null,
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        default: null,
    },
    parentId: {
        type: Schema.Types.ObjectId,
    },
    isCompany: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
