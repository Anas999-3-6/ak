// import { massages } from "../helpers/constant.js";
import { fule_type, massages } from "../helpers/constant.js";
import { OrderModel } from "../model/order.js";
import { incrimentQtyOfPump } from "./pump.js";
import { logger } from "../../app.js";
export const addOrder = async (req) => {
  try {
    let { type, liters, cost, supplier, fuel, pump } = req.body;
    type = fule_type.bulk;

    const newOrder = new OrderModel({
      type,
      liters,
      cost,
      supplier,
      fuel,
      pump,
    });
    const saveOrderDetails = await newOrder.save();
    await incrimentQtyOfPump(pump, liters);
    return saveOrderDetails;
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};

export const getAllOrder = async () => {
  try {
    return await OrderModel.aggregate([
      {
        $lookup: {
          from: "supplies",
          localField: "supplier",
          foreignField: "_id",
          as: "supplier",
        },
      },
      { $unwind: "$supplier" },
      {
        $lookup: {
          from: "pumps",
          localField: "pump",
          foreignField: "_id",
          as: "pump",
        },
      },
      { $unwind: "$pump" },
      {
        $lookup: {
          from: "fuels",
          localField: "fuel",
          foreignField: "_id",
          as: "fuel",
        },
      },
      { $unwind: "$fuel" },
      { $sort: { _id: -1 } },
    ]);
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};
