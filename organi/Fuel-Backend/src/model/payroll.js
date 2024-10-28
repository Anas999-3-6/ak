import mongoose from "mongoose";
import { tableName } from "../helpers/constant.js";
const ObjectId = mongoose.Schema.Types.ObjectId;


const payRollSchema = mongoose.Schema({
    isActive: { type: Boolean, default: true },
    staff: { type: ObjectId, required: true },
    basic_salary: { type: Number, required: true },
    allowances: { type: Number, required: true },
    tds: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: false, default: new Date().getTime() },
    updated_at: { type: Date, required: false, default: new Date().getTime() },
});

export const PayRollModel = mongoose.model(tableName.PAYROLL, payRollSchema);
