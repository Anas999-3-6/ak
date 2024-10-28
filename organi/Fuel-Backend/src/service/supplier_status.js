import { massages } from "../helpers/constant.js";
import { StatusModel } from "../model/supplier_status.js";
import { logger } from "../../app.js";

export const supplier_status = async () => {
  try {
    return await StatusModel.find();
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};
