import rateLimit from "express-rate-limit"

export const rateLimitMiddleWare = rateLimit({
    windowMs: 60 * 1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 429,
    message: { message: "Too many requests, please try again later.", statusCode: 429 }
})