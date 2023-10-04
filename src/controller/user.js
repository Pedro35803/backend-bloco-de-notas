import bcrypt from "bcrypt";

import {
    createUser,
    getUser,
    getUserByEmail,
    updateUser,
} from "../database/services/user.js";

import {
    createAccessToken,
    createRefreshToken,
    timeToken,
} from "../services/generateToken.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail({ email });
    const isPasswordEquals = await bcrypt.compare(user.password, password);

    if (!user || !isPasswordEquals) {
        throw new Error("Email or password not valid.");
    }

    res.locals.userId = user.id;

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

    res.json({ token: { access, refresh } }).status(201);
};

export const get = async (req, res) => {
    const { id } = req.session;
    const user = await getUser({ id });
    res.json(user).status(200);
};

export const create = async (req, res) => {
    const { password, email, name } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
        data: {
            name,
            email,
            password: hashPassword,
        },
    });
    res.json({ id: user.id, name, email }).status(201);
};

export const update = async (req, res) => {
    const { id } = req.session;
    const data = req.body;
    const user = await updateUser({ id, data });
    res.json(user).status(201);
};
