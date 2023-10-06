const handleError = (error, req, res, next) => {
    const status = res.locals.status || 400;
    res.status(status);
    console.error(error);

    const message = error.message;

    const unauthorizedIdentifier = "Unauthorized";
    if (message && message.startsWith(unauthorizedIdentifier)) {
        res.status(401);
    }

    const notExistsIdentifier = "not exists";
    if (message && message.endsWith(notExistsIdentifier)) {
        res.status(404);
    }

    res.json({ message, success: false });
};

export default handleError;
