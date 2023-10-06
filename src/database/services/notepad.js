import db from "../client.js";

export const getNotepad = async ({ id }) => {
    const notepad = await db.notepad.findUnique({ where: { id } });
    return notepad;
};

export const getNotepadsByUser = async ({ userId }) => {
    const notepads = db.notepad.findMany({ where: { userId } });
    return notepads;
};

export const createNoteppad = async ({ data, userId }) => {
    const notepad = await db.notepad.create({ data: { ...data, userId } });
    return notepad;
};

export const updateNotepad = async ({ id, data, userId }) => {
    const notepad = await getNotepad({ id });

    if (!notepad) {
        throw new Error("Notepad not exists");
    }

    if (notepad.userId != userId) {
        throw new Error("Unauthorized notepad delete");
    }

    return await db.notepad.update({
        where: { id },
        data,
    });
};

export const deleteNotepad = async ({ id, userId }) => {
    const notepad = await getNotepad({ id });

    if (!notepad) {
        throw new Error("Notepad not exists");
    }

    if (notepad.userId != userId) {
        throw new Error("Unauthorized notepad delete");
    }

    await db.notepad.delete({ where: { id } });
    return true;
};
