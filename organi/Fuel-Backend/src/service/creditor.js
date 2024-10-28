import { massages } from "../helpers/constant.js";
import { CreditorModel } from "../model/creditor.js";
import { logger } from "../../app.js";

export const saveCreditor = async (req) => {
  try {
    const { type, name, email, phone, office_address } = req.body;

    const isAlreadyExist = await CreditorModel.findOne({
      email: email,
    });

    if (isAlreadyExist) {
      return massages.already_exist;
    }

    const newCreditor = new CreditorModel({
      type,
      name,
      email,
      phone,
      office_address,
    });

    return await newCreditor.save();
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};

export const allCreditor = async () => {
  return await CreditorModel.find().sort({ created_at: -1 });
};
