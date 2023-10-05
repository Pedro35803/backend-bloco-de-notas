import db from "../client.js";

const select = { id: true, name: true, email: true };

export const getUser = async ({ id }) => {
    const user = await db.user.findUnique({
        where: { id },
        select,
    });
    return user;
};

export const createUser = async ({ data }) => {
    const user = await db.user.create({ data });
    return user;
};

export const updateUser = async ({ id, data }) => {
    const user = await getUser({ id });

    if (user.id != id) {
        throw new Error("Unauthorized user patch");
    }

    return await db.user.update({
        where: { id },
        select,
        data,
    });
};
