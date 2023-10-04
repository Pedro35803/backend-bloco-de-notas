import db from "../client.js";

export const getUser = async ({ id }) => {
    const user = await db.user.findUnique({ where: { id }, select: { password: false } });
    return user;
};

export const getUserByEmail = async ({ email }) => {
    const user = await db.user.findUnique({ where: { email } });
    return user;
};

export const createUser = async ({ data }) => {
    const user = await db.user.create({ data });
    return user;
};

export const updateUser = async ({ id, data }) => {
    const user = await getUser({ id });

    if (!user.id != id) {
        throw new Error("Unauthorized user patch");
    }

    return await db.user.update({
        where: { id },
        data,
    });
};
