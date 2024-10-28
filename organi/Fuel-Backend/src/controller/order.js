import { addOrder, getAllOrder } from "../service/order.js";

export const ordered = async (req, res) => {
  const data = await addOrder(req, res);
  res.send(data);
};

export const getOrder = async (req, res) => {
  const data = await getAllOrder(req, res);
  res.send(data);
};
