import { addSupplier, getAllSupplierDetails } from "../service/supplier.js";

export const supply = async (req, res) => {
  const data = await addSupplier(req, res);
  res.send(data);
};

export const getAllDetails = async (req, res) => {
  const data = await getAllSupplierDetails(req, res);
  res.send(data);
};
