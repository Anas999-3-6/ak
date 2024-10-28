import mongoose from "mongoose";
import { tableName } from "../helpers/constant.js";

const supplierStatusSchema = mongoose.Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

export const StatusModel = mongoose.model(
  tableName.STATUS,
  supplierStatusSchema
);
