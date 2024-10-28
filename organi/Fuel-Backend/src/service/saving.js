import { logger } from "../../app.js";
import { massages } from "../helpers/constant.js";
import { SavingModel } from "../model/saving.js";

export const createSavingData = async (req) => {
  try {
    const { bank, amount, note, pass_code } = req.body;

    const newSaving = new SavingModel({
      bank,
      amount,
      note,
      pass_code,
    });

    return await newSaving.save();
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};

export const getAllSavingData = async () => {
  try {
    return await SavingModel.find().sort({ created_at: -1 });
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};
