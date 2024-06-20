import Sidebar from "../module/sidebar.module.js";

export const getSidebar = async (req, res, next) => {
    try {
        const sidebar = await Sidebar.find({}, { __v: 0 }).exec();
        res.status(200).json(sidebar);

    } catch (error) {
        next(error)
    }
}

export const createSidebar = async (req, res, next) => {
    const { moduleName } = req.body;

    if (!moduleName) {
        return res.status(400).json({ Status: 0, Message: "Module name is required" })
    }

    const existData = await Sidebar.findOne({ moduleName });

    if (existData) {
        return res.status(400).json({ Status: 0, Message: "Module already exist" })
    }

    try {

        const sidebar = await Sidebar.create({ moduleName });

        res.status(201).json({ Status: 1, Message: "Module created successfully !", data: sidebar })


    } catch (error) {
        next(error)
    }

}