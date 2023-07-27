import http from "./httpService";
import { apiUrl } from "../config.json";
 
const leaveEnd = `${apiUrl}/leave`;  

export function leaveInsert(params) {    
    return http.post(`${leaveEnd}?${params}`);
}

export function staffLeaveInsert(params) {    
    return http.post(`${apiUrl}/staff_leave?${params}`);
}

export function getAllLeaves(params) {
    return http.get(`${leaveEnd}?${params}`)
}
export function getStaffAllLeaves(params) {
    return http.get(`${apiUrl}/staff_leave?${params}`)
}

export function updateLeaves(params) {
    return http.put(`${leaveEnd}?${params}`)
}

export function staffUpdateLeaves(params) {
    return http.put(`${apiUrl}/staff_leave?${params}`)
}
export function staffListLeave(params) {
    return http.get(`${apiUrl}/leave_list?${params}`)
}
