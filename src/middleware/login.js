import bcrypt from "bcrypt";

import {
    createAccessToken,
    createRefreshToken,
    timeToken,
} from "../services/generateToken.js";

import db from "../database/client.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
        res.locals.status = 401;
        throw new Error("Email or password not valid.");
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
        res.locals.status = 401;
        throw new Error("Email or password not valid.");
    }

    const access = createAccessToken(user);
    const refresh = createRefreshToken(user);

    const minutesAccessToken = Number(process.env.ACCESS_TOKEN_DURATION_MINUTES);
    const minutesRefreshToken = Number(process.env.REFRESH_TOKEN_DURATION_MINUTES);

    const objConfig = { httpOnly: true, secure: true, sameSite: "strict" };

    res.cookie("access-token", access, {
        ...objConfig,
        expires: timeToken(minutesAccessToken),
    });

    res.cookie("refresh-token", refresh, {
        ...objConfig,
        expires: timeToken(minutesRefreshToken),
    });

    res.status(201).json({ token: { access, refresh } });
};

export default login;
