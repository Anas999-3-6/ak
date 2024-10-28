import { allPayRoll, savePayRoll } from "../service/payroll.js";


export const addPayRoll = async (req, res) => {
    const data = await savePayRoll(req, res);
    res.send(data);
};

export const fetchAllPayRoll = async (req, res) => {
    const data = await allPayRoll(req, res);
    res.send(data);
};