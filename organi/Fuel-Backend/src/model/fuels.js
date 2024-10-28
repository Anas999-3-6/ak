import mongoose from "mongoose";
import { tableName } from "../helpers/constant.js";

const FuelSchema = mongoose.Schema({
  fuel_type: { type: String, required: true },
  liters: { type: Number, default: 0 },
  liter_price: {
    type: Number,
    required: true,
  },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, required: false, default: new Date().getTime() },
  updated_at: { type: Date, required: false, default: new Date().getTime() },
});

export const FuelModel = mongoose.model(tableName.FUEL, FuelSchema);
