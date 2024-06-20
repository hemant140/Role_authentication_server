import User from "../module/user.module.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.aggregate([
            {
                $match: {
                    status: true
                }
            }
            , {
                $lookup: {
                    from: 'organizations',
                    localField: 'orgId',
                    foreignField: '_id',
                    as: 'organizations'
                }
            },
            {
                $unwind: {
                    path: '$organizations',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "roles",
                    localField: 'roleId',
                    foreignField: '_id',
                    as: 'roles'
                }
            },
            {
                $unwind: {
                    path: '$roles',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1, name: 1, email: 1, isComopany: 1, status: 1, createdAt: 1, updatedAt: 1, orgName: "$organizations.orgName",
                    website: "$organizations.website", phone: "$organizations.phone", country: "$organizations.country", city: "$organizations.city",
                    role: "$roles.role"
                }
            }
        ]);

        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
}


export const updateUsers = async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}

export const createUser = async(req,res,next)=>{
    

}