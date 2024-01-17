const handleError = (error, req, res, next) => {
    res.status(res.locals.status || 400);
    console.error(error);

    const message = error.message;

    const unauthorizedIdentifier = "Unauthorized";
    const expiredIdentifier = "JWT expired";
    if (
        message &&
        message.startsWith(unauthorizedIdentifier) &&
        message.endsWith(expiredIdentifier)
    ) {
        res.status(401);
    }

    const notExistsIdentifier = "not exists";
    if (message && message.endsWith(notExistsIdentifier)) {
        res.status(404);
    }

    const valueUniqueIndentifier = "Unique constraint failed on the fields:";
    if (message && message.includes(valueUniqueIndentifier)) {
        const field = error.meta.target[0];
        res.status(409).json({
            message: `Value field ${field} already in use`,
            success: false,
            field,
        });
    }

    res.json({ message, success: false });
};

export default handleError;
