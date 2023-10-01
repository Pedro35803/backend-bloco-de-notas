import {
    createNoteppad,
    deleteNotepad,
    getNotepad,
    getNotepadsByUser,
    updateNotepad,
} from "../database/services/notepad";

export const get = async (req, res) => {
    const { id } = req.params;
    const notepad = getNotepad({ id });
    res.json(notepad).status(200);
};

export const getByUser = (req, res) => {
    const { idUser } = res.locals
    const notepads = getNotepadsByUser({ idUser });
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
    const { idUser } = res.locals
    return await deleteNotepad({ id, idUser })
}