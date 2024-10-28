import { massages, time_para } from "../helpers/constant.js";
import { SalesModel } from "../model/Sales.js";
import moment from "moment/moment.js";
import { decrimentQtyOfPump, isFuelAvailable } from "./pump.js";
import { logger } from "../../app.js";

export const createSalesData = async (req) => {
  try {
    const { liter, amount, staff, fuel, pump } = req.body;

    const newSales = new SalesModel({
      liter,
      amount,
      staff,
      fuel,
      pump,
    });

    const isFuesAvailable = await isFuelAvailable(pump, liter);
    if (isFuesAvailable) {
      await newSales.save();
      await decrimentQtyOfPump(pump, liter);
    } else {
      return massages.fuel_not_available;
    }
  } catch (error) {
    console.error(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};

export const getAllSalesData = async () => {
  try {
    return await SalesModel.aggregate([
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
    return massages.internal_server_error;
  }
};

export const salesReportByDate = async (req) => {
  try {
    let startDate, endDate;

    if (req.params.value == time_para.today) {
      startDate = moment().startOf("day");
      endDate = moment().endOf("day");
    } else if (req.params.value == time_para.month) {
      startDate = moment().startOf("month");
      endDate = moment().endOf("month");
    } else if (req.params.value == time_para.year) {
      startDate = moment().startOf("year");
      endDate = moment().endOf("year");
    }

    const salesData = await SalesModel.aggregate([
      {
        $match: {
          created_at: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        },
      },
      {
        $lookup: {
          from: "fuels",
          localField: "fuel",
          foreignField: "_id",
          as: "fuel",
        },
      },
      { $unwind: "$fuel" },
      {
        $lookup: {
          from: "staffs",
          localField: "staff",
          foreignField: "_id",
          as: "staff",
        },
      },
      { $unwind: "$staff" },
      {
        $lookup: {
          from: "pumps",
          localField: "pump",
          foreignField: "_id",
          as: "pump",
        },
      },
      { $unwind: "$pump" },
      { $sort: { _id: -1 } },
    ]);

    const response = {
      diesel: 0,
      petrol: 0,
      gas: 0,
      carosene: 0,
      total: 0,
    };

    salesData?.forEach((item) => {
      switch (item?.fuel?.fuel_type) {
        case "Diesel":
          response.diesel += item.amount;
          break;
        case "petrol":
          response.petrol += item.amount;
          break;
        case "gas":
          response.gas += item.amount;
          break;
        case "carosine":
          response.carosene += item.amount;
          break;
        default:
          break;
      }
      response.total += item.amount;
    });

    return response;
  } catch (error) {
    console.log(error);
    logger.error(`${error.message}\n${error.stack}`);
  }
};
