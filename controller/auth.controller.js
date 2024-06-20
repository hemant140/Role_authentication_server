import generateToken from "../config/generateToken.js";
import OrganizationModel from "../module/organization.module.js";
import Role from "../module/role.module.js";
import User from "../module/user.module.js";
import bcryptjs from 'bcryptjs';


export const login = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ Status: 0, Message: "Please enter your credentials !" })
    }

    try {
        const existing = await User.findOne({ email: email.toLowerCase() });

        if (!existing) {
            res.status(401).json({
                Status: 0,
                Message: "Invalid Email or Password!"
            })
        }

        const validatePassword = bcryptjs.compareSync(password, existing.password);

        if (!validatePassword) {
            res.status(401).json({
                Status: 0,
                Message: "Wrong Password!"
            })
        }


        const tokenData = {
            id: existing._id,
            email: existing.email,
            role: existing.roleId,
            isCompany: existing.isCompany,
            parentId: existing.parentId,
            orgId: existing.orgId,
        }

        const token = generateToken(tokenData);


        res.cookie('authToken', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            .status(200)
            .json({
                Status: 1,
                Message: "Login Successful",
                token: token
            });

    } catch (error) {
        next(error);
    }

}

export const signUp = async (req, res, next) => {

    const { name, email, password, phone, orgName, website, country, city } = req.body;

    if (!email || !password || !phone || !orgName || !website || !country || !city) {
        res.status(400).json({ Status: 0, Message: "Please fill all the fields" });
    }

    const users = await User.findOne({ email: email.toLowerCase() });

    if (users) {
        res.status(400).json({ Status: 0, Message: "Email is already exist !" });
    }

    try {
        const org = await OrganizationModel.create({ orgName, phone, website, country, city });

        let role = await Role.findOne({ role: 'Admin' })

        if (!role) {
            role = await Role.create({ role: 'Admin' })
        }

        const encryptedPassword = bcryptjs.hashSync(password, 10);
        await User.create({ name, email, password: encryptedPassword, roleId: role, orgId: org._id })
        res.status(201).json({ Status: 1, Message: "Signup Completed !" });
    } catch (error) {
        next(error);
    }





}

export const registration = async (req, res, next) => {

    const { name, email, password, roleName } = req.body;

    if (!email || !password || !name || !roleName) {
        return res.status(400).json({ Status: 0, Message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ Status: 0, Message: "User already exists" });
    }

    let roles = await Role.findOne({ roleName });

    if (!roles) {
        roles = await Role.create({ role: roleName });
    }

    const ecryptedPassword = bcryptjs.hashSync(password, 10);

    const user = new User({ name, email, password: ecryptedPassword, isCompany: true, roleId: roles._id });

    try {

        await user.save();
        res.status(201).json({ Status: 1, Message: "User created successfully" });

    } catch (error) {
        next(error)
    }

}