import mongoose from "mongoose";
import { tableName } from "../helpers/constant.js";
const ObjectId = mongoose.Schema.Types.ObjectId;

const SalesSchema = mongoose.Schema({
  liter: { type: Number, required: true },
  amount: { type: Number, required: true },
  staff: { type: ObjectId, required: true },
  fuel: { type: ObjectId, required: true },
  pump: { type: ObjectId, required: true },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, required: false, default: new Date().getTime() },
  updated_at: { type: Date, required: false, default: new Date().getTime() },
});

export const SalesModel = mongoose.model(tableName.SALES, SalesSchema);
