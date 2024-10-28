import express from "express";
import { addUser, login, update } from "../controller/user.js";
import { fuelData, updatePrice } from "../controller/fuel.js";
import { supplier_Code } from "../controller/supplier_status.js";
import { supply, getAllDetails } from "../controller/supplier.js";
import { addStaff, fetchAllStaff } from "../controller/staff.js";
import { addPayRoll, fetchAllPayRoll } from "../controller/payroll.js";
import { addCreditor, fetchCreditor } from "../controller/creditor.js";
import { ordered, getOrder } from "../controller/order.js";
import { addPump, fetchPump } from "../controller/pump.js";
import { addDuty, fetchAllDuty } from "../controller/assign_duty.js";
import { addSaving, fetchAllSaving } from "../controller/saving.js";
import { fetchAllSales, addSales, salesReport } from "../controller/sales.js";
const router = express.Router();

// user routes

router.post("/user/add", addUser);
router.post("/user/login", login);
router.patch("/user/details/upadate", update);

// router.get("/user/twofactorauth", twoFActorAuthentication);

//Fuel routes

router.get("/fuel/details", fuelData);
router.put('/fuel/update-price',updatePrice)

// Supplier_Status routes

router.get("/supplier/status", supplier_Code);

// Supplier routes

router.post("/supplier/details", supply);
router.get("/supplier/getalldetails", getAllDetails);

// Order routes

router.post("/order/details", ordered);
router.get("/order/getAllDetails", getOrder);

// Pump rotes
router.post("/add/pump", addPump);
router.get("/pump/getalldetails", fetchPump);

//Assign Duty routes
router.post("/add/duty", addDuty);
router.get("/duty/get/all", fetchAllDuty);

// Saving  routes

// Creditors

router.post("/creditor/add", addCreditor);
router.get("/creditor/get/all", fetchCreditor);

// Saving
router.post("/add/saving", addSaving);
router.get("/saving/get/all", fetchAllSaving);

// Sales routes
router.post("/add/sales", addSales);
router.get("/sales/get/all", fetchAllSales);
router.get("/sales/report/:value", salesReport);

//staff routes

router.post("/staff/add", addStaff);
router.get("/staff/get/all", fetchAllStaff);

// payroll routes

router.post("/payroll/add", addPayRoll);
router.get("/payroll/get/all", fetchAllPayRoll);

export default router;
