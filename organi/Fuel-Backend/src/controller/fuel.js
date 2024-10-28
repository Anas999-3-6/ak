import { fuelManagement, updateFuelPrice } from "../service/fule.js";

export const fuelData = async (req, res) => {
  const data = await fuelManagement(req, res);
  res.send(data);
};

export const updatePrice = async (req,res)=>{
  const data = await updateFuelPrice(req,res)
  res.send(data)
}
