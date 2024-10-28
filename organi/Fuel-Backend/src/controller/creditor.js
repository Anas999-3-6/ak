import { allCreditor, saveCreditor } from "../service/creditor.js";


export const addCreditor = async (req, res) => {
    const data = await saveCreditor(req, res);
    res.send(data);
};

export const fetchCreditor = async (req, res) => {
    const data = await allCreditor(req, res);
    res.send(data);
};