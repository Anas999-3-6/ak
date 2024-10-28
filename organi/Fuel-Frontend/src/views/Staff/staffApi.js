import { apiurls } from "Service/api"
import axios from "axios"

export const getAllStaffDetails = async () => {
    return await axios.get(apiurls.getAllStaff)
}

export const saveStaffDetails = async (staffData)=>{
    const url = apiurls?.saveStaff
    return axios.post(url,staffData)
}