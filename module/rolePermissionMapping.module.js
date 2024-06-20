import mongoose, { Schema } from "mongoose";

const rolePermissionMappingSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },       
    roleId: { type: Schema.Types.ObjectId, ref: 'Role' },
    sidebarId: [{ type: Schema.Types.ObjectId, ref: 'Sidebar' }],
    permissionId: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
}, { timestamps: true });

const RolePermissionMapping = mongoose.model('RolePermissionMapping', rolePermissionMappingSchema);

export default RolePermissionMapping;