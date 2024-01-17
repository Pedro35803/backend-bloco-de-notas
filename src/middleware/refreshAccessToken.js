import jwt from "jsonwebtoken";

import { createAccessToken } from "../services/generateToken.js";
import { timeToken } from "../services/generateToken.js";
import { getUser } from "../database/services/user.js";

const refreshToken = async (req, res, next) => {
    const { refresh } = req.body;
    const secret = process.env.KEY_JWT;
    const decoded = await jwt.verify(refresh, secret);

    if (!decoded) {
        res.locals.status = 401;
        throw new Error("Unauthorized access");
    }

    const userId = decoded.sub;
    const user = await getUser({ id: userId });

    const minutesAccessToken = Number(
        process.env.ACCESS_TOKEN_DURATION_MINUTES
    );
    const access = createAccessToken(user);

    res.cookie("access-token", access, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: timeToken(minutesAccessToken),
    });

    res.status(201).json({ access });
};

export default refreshToken;
