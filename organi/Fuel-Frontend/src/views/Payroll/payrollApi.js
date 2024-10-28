import { apiurls } from 'Service/api';
import axios from 'axios';

export const fetchStaffRecords = async () => {
  return await axios.get(apiurls.getAllStaff);
};

export const savePayrollDetails = async (payrollData) => {
  const url = apiurls.savePayroll;
  return await axios.post(url, payrollData);
};

export const fetchPayrollRecords = async () => {
  return await axios.get(apiurls?.fetchPayroll);
};
