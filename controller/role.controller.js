import Role from "../module/role.module.js";

export const createRole = async (req, res, next) => {

    const { roleName } = req.body;

    if (!roleName) {
        return res.status(400).json({ message: "Role name is required" })
    }

    const existsRole = await Role.findOne({ role: roleName });

    if (existsRole) {
        return res.status(400).json({ Status: 0, Message: "Role already exists" });
    }

    const newRole = new Role({ role: roleName });

    try {
        const response = await newRole.save();

        return res.status(201).json({ Status: 1, Message: "Role Created Successfully !", Role_id: response._id })

    } catch (error) {
        next(error)
    }

}

export const getRole = async (req, res, next) => {
    try {

        const role = await Role.aggregate([{
            $match: {
                role: {
                    $ne: "Super Admin"
                }
            }
        },
        {
            $project: {
                __v: 0
            }
        }]);

        return res.status(200).send(role)


    } catch (error) {
        next(error)
    }
}