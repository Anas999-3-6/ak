import { addPumpData, getAllPumpDetails } from "../service/pump.js";

export const addPump = async (req, res) => {
  const data = await addPumpData(req, res);
  res.send(data);
};

export const fetchPump = async (req, res) => {
  const data = await getAllPumpDetails(req, res);
  res.send(data);
};
