import mongoose from "mongoose";
import { tableName } from "../helpers/constant.js";
const ObjectId = mongoose.Schema.Types.ObjectId;

const PumpSchema = mongoose.Schema({
  code: { type: String, required: true },
  desc: { type: String, required: true },
  fuel: { type: ObjectId, required: true },
  isActive: { type: Boolean, default: true },
  avl_qty: { type: Number, default: 0 },
  created_at: { type: Date, required: false, default: new Date().getTime() },
  updated_at: { type: Date, required: false, default: new Date().getTime() },
});

export const PumpModel = mongoose.model(tableName.PUMP, PumpSchema);
