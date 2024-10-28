import { generateRandom } from "../helpers/common.js";
import { massages } from "../helpers/constant.js";
import { StaffModel } from "../model/staff.js";
import { logger } from "../../app.js";

export const saveStaff = async (req) => {
  try {
    const {
      name,
      designation,
      phone,
      email,
      address,
      qualification,
      full_name,
    } = req.body;

    const isAlreadyExist = await StaffModel.findOne({
      email: email,
    });

    if (isAlreadyExist) {
      return massages.already_exist;
    }

    let reg_number = "PMS" + generateRandom();
    const staffDatails = new StaffModel({
      name,
      designation,
      phone,
      email,
      address,
      qualification,
      reg_number,
      full_name,
    });

    return await staffDatails.save();
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};

export const allStaff = async () => {
  return await StaffModel.find().sort({ created_at: -1 });
};
