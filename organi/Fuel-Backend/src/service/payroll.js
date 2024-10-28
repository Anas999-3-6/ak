import { PayRollModel } from "../model/payroll.js";
import { logger } from "../../app.js";
import { massages } from "../helpers/constant.js";

export const savePayRoll = async (req) => {
  const { basic_salary, staff, allowances, tds } = req.body;

  const payRollDetails = new PayRollModel({
    basic_salary,
    staff,
    allowances,
    tds,
  });

  return await payRollDetails.save();
};

export const allPayRoll = async () => {
  try {
    return await PayRollModel.aggregate([
      {
        $lookup: {
          from: "staffs",
          localField: "staff",
          foreignField: "_id",
          as: "staff",
        },
      },
      { $unwind: "$staff" },
      { $sort: { _id: -1 } },
    ]);
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error
  }
};
