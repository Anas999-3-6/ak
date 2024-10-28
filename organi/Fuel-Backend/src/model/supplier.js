import mongoose from "mongoose";
import { tableName } from "../helpers/constant.js";

const supplierSchema = mongoose.Schema({
  name: { type: String, required: true },
  representative: { type: String, required: false },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  supplier_type: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, required: false, default: new Date().getTime() },
  updated_at: { type: Date, required: false, default: new Date().getTime() },
});

export const SupplierModel = mongoose.model(tableName.SUPPLIER, supplierSchema);
