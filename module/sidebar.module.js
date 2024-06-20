import mongoose from "mongoose";

const sidebarSchema = new mongoose.Schema({

    moduleName: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        default: true
    }
}, { timestamps: true });


const Sidebar = mongoose.model('Sidebar', sidebarSchema);
export default Sidebar;