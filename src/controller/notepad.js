import {
    createNoteppad,
    deleteNotepad,
    getNotepad,
    getNotepadsByUser,
    updateNotepad,
} from "../database/services/notepad.js";

export const get = async (req, res) => {
    const { id } = req.params;
    const { userId } = res.locals;
    const notepad = await getNotepad({ id });

    if (notepad.userId != userId) {
        throw new Error("Unauthorized notepad search");
    }

    res.json(notepad).status(200);
};

export const getByUser = async (req, res) => {
    const { userId } = res.locals;
    const notepads = await getNotepadsByUser({ userId });
    res.json(notepads).status(200);
};

export const create = async (req, res) => {
    const data = req.body;
    const { userId } = res.locals;
    const notepad = await createNoteppad({ data, userId });
    res.json(notepad).status(201);
};

export const update = async (req, res) => {
    const { userId } = res.locals;
    const { id } = req.params;
    const data = req.body;
    const notepad = await updateNotepad({ id, data, userId });
    res.json(notepad).status(201);
};

export const del = async (req, res) => {
    const { id } = req.params;
    const { userId } = res.locals;
    await deleteNotepad({ id, userId });
    res.status(204).send("sucess");
};
