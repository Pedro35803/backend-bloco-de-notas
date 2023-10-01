import { createUser, getUser, updateUser } from "../database/services/user.js";

export const get = (req, res) => {
    const { id } = req.params;
    const user = getUser({ id });
    res.json(user).status(200);
};

export const create = async (req, res) => {
    const data = req.body;
    const user = createUser({ data });
    res.json(user).status(201);
};

export const update = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const user = updateUser({ id, data });
    res.json(user).status(201);
};
