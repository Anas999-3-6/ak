import mongoose from "mongoose";
import { tableName } from "../helpers/constant.js";
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = mongoose.Schema({
  type: { type: String, required: false },
  liters: { type: Number, required: true },
  cost: { type: Number, required: true },
  supplier: { type: ObjectId, required: true },
  fuel: { type: ObjectId, required: true },
  pump: { type: ObjectId, required: true },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, required: false, default: new Date().getTime() },
  updated_at: { type: Date, required: false, default: new Date().getTime() },
});

export const OrderModel = mongoose.model(tableName.ORDER, OrderSchema);
