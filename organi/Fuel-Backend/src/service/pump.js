import { massages } from "../helpers/constant.js";
import { PumpModel } from "../model/pump.js";
import { logger } from "../../app.js";

export const addPumpData = async (req) => {
  try {
    const { code, desc, fuel } = req.body;

    const newPump = new PumpModel({
      code,
      desc,
      //   status,
      fuel,
    });

    return await newPump.save();
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};

export const getAllPumpDetails = async () => {
  try {
    return await PumpModel.aggregate([
      {
        $lookup: {
          from: "fuels",
          localField: "fuel",
          foreignField: "_id",
          as: "fuel",
        },
      },
      { $unwind: "$fuel" },
    ]);
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};

export const isFuelAvailable = async (pumpId, requiredQty) => {
  try {
    const where = {
      _id: pumpId,
    };
    const pumpData = await PumpModel.findById(where);
    return pumpData && pumpData?.avl_qty >= requiredQty;
  } catch (error) {
    console.error("Error checking fuel availability:", error);
    logger.error(`${error.message}\n${error.stack}`);
    return false;
  }
};

export const incrimentQtyOfPump = async (pump, qty) => {
  const where = {
    _id: pump,
  };
  const pumpData = await PumpModel.findById(where);
  pumpData.avl_qty += qty;
  await pumpData.save();
};

export const decrimentQtyOfPump = async (pump, qty) => {
  const where = {
    _id: pump,
  };
  const pumpData = await PumpModel.findById(where);
  pumpData.avl_qty -= qty;
  await pumpData.save();
};

