// swaggerDocs.js

import { addDutyDocs, fetchAllDutyDocs } from "./assign_duty.js";
import { addCreditorDocs, fetchCreditorDocs } from "./creditor.js";
import { fuelTypeDocs } from "./fuel.js";
import { addOrderDocs, getAllOrdersDocs } from "./order.js";
import { addPayrollDocs, getAllPayrollDocs } from "./payroll.js";
import { addPumpDocs, getPumpDetailsDocs } from "./pump.js";
import { addSalesDocs, fetchAllSalesDocs } from "./sales.js";
import { addSavingDocs, fetchAllSavingDocs } from "./saving.js";
import { addStaffDocs, getAllStaffDocs } from "./staff.js";
import { addSupplierDocs, fetchAllSupplierDocs, supplierStatusDocs } from "./supplier.js";
import { addUserDoc, loginDocs, updateUserDocs } from "./user.js";

export const generateSwaggerDocs = () => {
    return {
        openapi: "3.0.0",
        info: {
            title: "Fuel Management System",
            version: "1.0.0",
            description: "API documentation for fuel management system ",
        },
        paths: {

            // user docs 
            "/user/add": addUserDoc,
            "/user/login": loginDocs,
            "/user/update": updateUserDocs,

            // fuel docs 
            "/fuel/details": fuelTypeDocs,

            //supplier docs 
            "/supplier/status": supplierStatusDocs,
            "/supplier/details": addSupplierDocs,
            "/supplier/getalldetails": fetchAllSupplierDocs,

            //order docs 
            "/order/details": addOrderDocs,
            "/order/getAllDetails": getAllOrdersDocs,

            //pump docs 
            "/add/pump": addPumpDocs,
            "/pump/getalldetails": getPumpDetailsDocs,

            //assign duty 
            "/add/duty": addDutyDocs,
            "/duty/get/all": fetchAllDutyDocs,


            // creditors 
            "/creditor/add": addCreditorDocs,
            "/creditor/get/all": fetchCreditorDocs,

            // saving 
            "/add/saving": addSavingDocs,
            "/saving/get/all": fetchAllSavingDocs,


            //sales 
            "/add/sales": addSalesDocs,
            "/sales/get/all": fetchAllSalesDocs,

            //staff 
            "/staff/add": addStaffDocs,
            "/staff/get/all": getAllStaffDocs,

            //payroll
            "/payroll/add": addPayrollDocs,
            "/payroll/get/all": getAllPayrollDocs,

        }
    };
};
