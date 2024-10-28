import { supplier_status } from "../service/supplier_status.js";

export const supplier_Code = async (req, res) => {
  const data = await supplier_status(req, res);
  res.send(data);
};
