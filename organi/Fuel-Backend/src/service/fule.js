import {massages } from "../helpers/constant.js";
import { FuelModel } from "../model/fuels.js";
import { logger } from "../../app.js";

export const fuelManagement = async () => {
  try {
    return await FuelModel.find();
  } catch (error) {
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};

export const updateFuelPrice = async (req) => {
  try {
    if (req.body != undefined && req.body != null) {
      const { fuel_type, price } = req.body
      const where = {
        _id: fuel_type
      }
      const updatedFuel = await FuelModel.findOneAndUpdate(
        where,
        { $set: { liter_price: price } },
        { new: true }
      );
      if (updatedFuel) {
        return massages.fuel_price_updated
      } else {
        return massages.record_not_found
      }
    }
  } catch (error) {
    logger.error(`${error.message}\n${error.stack}`);
  }
}
