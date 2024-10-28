import mongoose from "mongoose";
import { tableName } from "../helpers/constant.js";

const SavingSchema = mongoose.Schema({
  bank: { type: String, required: true },
  amount: { type: Number, required: true },
  note: { type: String, required: true },
  pass_code: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, required: false, default: new Date().getTime() },
  updated_at: { type: Date, required: false, default: new Date().getTime() },
});

export const SavingModel = mongoose.model(tableName.SAVING, SavingSchema);
