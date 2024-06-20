import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    orgName: { type: String, required: true },
    website: { type: String, default: null },
    phone: { type: Number, required: true },
    country: { type: String, default: null },
    city: { type: String, default: null },
    status: { type: Boolean, default: true }
}, { timestamps: true });

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;