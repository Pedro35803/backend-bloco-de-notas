import db from "../client.js";
import { getUser } from "./user.js";

export const getNotepad = async ({ id }) => {
    const notepad = await db.notepad.findUnique({ where: { id } });
    return notepad;
};

export const getNotepadsByUser = async ({ idUser }) => {
    const user = await getUser({ id: idUser });
    return user;
};

export const createNoteppad = async ({ data }) => {
    const notepad = await db.notepad.create({ data });
    return notepad;
};

export const updateNotepad = async ({ id, data }) => {
    const notepad = await getNotepad({ id });

    if (notepad.id != id) {
        throw new Error("Unauthorized notepad patch");
    }

    return await bd.notepad.update({
        where: { id },
        data,
    });
};

export const deleteNotepad = async ({ id, idUser }) => {
    const notepad = await getNotepad({ id });

    if (notepad.userId != idUser) {
        throw new Error("Unauthorized notepad delete");
    }

    return await db.notepad.delete({ where: { id } });
};
