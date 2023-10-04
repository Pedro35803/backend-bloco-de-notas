import {
    createNoteppad,
    deleteNotepad,
    getNotepad,
    getNotepadsByUser,
    updateNotepad,
} from "../database/services/notepad.js";

export const get = async (req, res) => {
    const { id } = req.params;
    const notepad = getNotepad({ id });
    res.json(notepad).status(200);
};

export const getByUser = (req, res) => {
    const { userId } = res.locals;
    const notepads = getNotepadsByUser({ userId });
    res.json(notepads).status(200);
};

export const create = (req, res) => {
    const data = req.body;
    const notepad = createNoteppad({ data });
    res.json(notepad).status(201);
};

export const update = (req, res) => {
    const { id } = res.params;
    const data = req.body;
    const notepad = updateNotepad({ id, data });
    res.json(notepad).status(201);
};

export const del = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;
    return await deleteNotepad({ id, userId });
};
