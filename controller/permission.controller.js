import Permission from "../module/permission.module.js";

export const getPermission = async (req, res, next) => {
    try {
        const permission = await Permission.find({},{__v:0}).exec();
        res.status(200).json(permission);

    } catch (error) {
        next(error)
    }
}

export const createPermission = async (req, res, next) => {

    const { permissionName } = req.body;

    if (!permissionName) {
        return res.status(400).json({ Status: 0, Message: "Permission name is required" })
    }

    const existData = await Permission.findOne({ permissionName });

    if (existData) {
        return res.status(400).json({ Status: 0, Message: "Permission already exist" })
    }

    try {

        const permission = await Permission.create({ permissionName });

        res.status(201).json({ Status: 1, Message: "Permission created successfully !", data: permission })


    } catch (error) {
        next(error)
    }
}