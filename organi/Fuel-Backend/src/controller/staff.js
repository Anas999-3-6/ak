import { allStaff, saveStaff } from "../service/staff.js";


export const addStaff = async (req, res) => {
    const data = await saveStaff(req, res);
    res.send(data);
};

export const fetchAllStaff = async (req, res) => {
    const data = await allStaff(req, res);
    res.send(data);
};