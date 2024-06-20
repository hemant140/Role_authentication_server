import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    console.log(req.method)

    if (!token) {
        return res.status(401).json({ Status: 0, Message: 'Access denied. No token provided.' });
    }

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRECT_KEY);

        if (decode.data.isCompany === false && req.method === 'POST' && (req.baseUrl === '/sidebar' || req.baseUrl === '/permission' || req.baseUrl === '/role')) {
            return res.status(401).json({ Status: 0, Message: "No Access" })
        }

        next();

    } catch (error) {
        res.status(401).json({ Status: 0, Message: "Invalid Token !" })
    }
}

export default verifyToken;