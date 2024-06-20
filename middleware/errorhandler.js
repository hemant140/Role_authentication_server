export const notFound = (req, res, next) => {
    const error = new Error(`Url Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error)
}

export const errorhandler = (err, req, res, next) => {
    console.log("Error handler Middlerware");
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.Message,
        stack: process.env.NODE_ENV === "Production" ? null : err.stack,
        errorObj: err
    })

}