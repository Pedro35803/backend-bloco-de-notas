import bcrypt from "bcrypt";

import {
    createUser,
    getUser,
    updateUser,
} from "../database/services/user.js";

export const get = async (req, res) => {
    const { userId } = res.locals;
    const user = await getUser({ id: userId });
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
    const { userId } = res.locals;
    const data = req.body;
    const user = await updateUser({ id: userId, data });
    res.json(user).status(201);
};
