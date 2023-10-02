import bcrypt from "bcrypt";
import {
    createUser,
    getUser,
    getUserByEmail,
    updateUser,
} from "../database/services/user.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail({ email });
    const isPasswordEquals = await bcrypt.compare(user.password, password);

    if (user && isPasswordEquals) {
        res.session.userId = user.id;
        res.json({
            message: "User authenticated with success.",
            userId: user.id,
        }).status(201);
    } else {
        res.json({ message: "Email or password not valid." });
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out with success." });
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
    res.json(user).status(201);
};

export const update = async (req, res) => {
    const { id } = req.session;
    const data = req.body;
    const user = await updateUser({ id, data });
    res.json(user).status(201);
};
