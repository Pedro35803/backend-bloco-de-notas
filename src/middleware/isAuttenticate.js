import jwt from "jsonwebtoken";

const authorization = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        res.locals.status = 401;
        throw new Error("Token is required");
    }

    const listString = bearerToken.split(" ");
    const token = listString[1];

    const secret = process.env.KEY_JWT;
    const decoded = jwt.verify(token, secret);

    if (!decoded) {
        res.locals.status = 401;
        throw new Error("Unauthorized access");
    }

    res.locals.userId = decoded.sub;
    next();
};

export default authorization;
