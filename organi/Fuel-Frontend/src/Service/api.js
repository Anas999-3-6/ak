const pmsUrl = 'https://fuelcrm.samyotech.in/api/';

export const apiurls = {
  //Fuel Api
  fuelList: pmsUrl + 'fuel/details',
  updateFuel: pmsUrl + 'fuel/update-price',

  //Supplier Api
  supplierList: pmsUrl + 'supplier/getalldetails',

  //Order Api
  addOrder: pmsUrl + 'order/details',
  getOrder: pmsUrl + 'order/getAllDetails',

  //Staff Api

  getAllStaff: pmsUrl + 'staff/get/all',
  saveStaff: pmsUrl + 'staff/add',

  // payroll api

  savePayroll: pmsUrl + 'payroll/add',
  fetchPayroll: pmsUrl + 'payroll/get/all',

  //Pump Api
  addPump: pmsUrl + 'add/pump',
  getPump: pmsUrl + 'pump/getalldetails',

  //Assign Duty

  addDuty: pmsUrl + 'add/duty',
  getDuty: pmsUrl + 'duty/get/all',

  //Staff Api
  addStaff: pmsUrl + 'staff/add',
  getStaff: pmsUrl + 'staff/get/all',

  //Saving Api
  addSaving: pmsUrl + 'add/saving',
  getSaving: pmsUrl + 'saving/get/all',

  //Sales Api
  addSales: pmsUrl + 'add/sales',
  getSales: pmsUrl + 'sales/get/all',
  salesReport: pmsUrl + 'sales/report/',

  //Supplier Api
  addSupplier: pmsUrl + 'supplier/details',
  getSupplier: pmsUrl + 'supplier/getalldetails',

  // Creditor Api
  addCreditor: pmsUrl + 'creditor/add',
  getCreditor: pmsUrl + 'creditor/get/all',

  //User Api

  // updateUser: pmsUrl + 'user/login',
  userLogin: pmsUrl + 'user/login',
  userSignup: pmsUrl + 'user/add',
  userUpdate: pmsUrl + 'user/details/upadate'
};
