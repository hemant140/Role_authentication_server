import { PRIORITY } from "../../enum/enum.js";
import joi from 'joi';

export const taskReq = joi.object().keys({
    title: joi.string().min(2).max(500).required(),
    description: joi.string(),
    label: joi.string().required(),
    assigned: joi.string().required(),
    priority: joi.string().valid(...Object.values(PRIORITY)).default(PRIORITY.NONE),
    image: joi.string().optional().allow(null, '')
});
