import Logger from "../module/logger.module.js";

export const loggerMiddleWare = async (req, res, next) => {

    try {
        const { method, url } = req;
        await Logger.create({ method, endPoint: url })
        next();
    } catch (error) {
        next(error)
    }

}