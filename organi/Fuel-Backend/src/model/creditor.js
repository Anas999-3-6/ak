import mongoose from "mongoose";
import { tableName } from "../helpers/constant.js";

const creditorSchema = mongoose.Schema({
  isActive: { type: Boolean, default: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  office_address: { type: String, required: true },
  created_at: { type: Date, required: false, default: new Date().getTime() },
  updated_at: { type: Date, required: false, default: new Date().getTime() },
});

export const CreditorModel = mongoose.model(tableName.CREDITOR, creditorSchema);
