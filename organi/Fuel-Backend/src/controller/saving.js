import { createSavingData, getAllSavingData } from "../service/saving.js";

export const addSaving = async (req, res) => {
  const data = await createSavingData(req, res);
  res.send(data);
};

export const fetchAllSaving = async (req, res) => {
  const data = await getAllSavingData(req, res);
  res.send(data);
};
