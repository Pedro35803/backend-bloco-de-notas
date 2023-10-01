import db from "../database/client.js";

export const getUser = async ({ id }) => {
    const user = await db.users.findUnique({ where: { id } });
    return user;
};

export const createUser = async ({ data }) => {
    const user = await db.users.post({ data });
    return user;
};

export const updateUser = async ({ id, data }) => {
    const user = await getUser({ id });

    if (!user.id != id) {
        throw new Error("Unauthorized user patch");
    }

    return await db.users.update({
        where: { id },
        data,
    });
};
