import http from "./httpService";
import { apiUrl } from "../config.json";
 

export function getAllStudent(params) {
    return http.get(`${apiUrl}/studentTransfer?${params}`)
}


export function transferStudent(data) {

    return http.post(`${apiUrl}/studentTransfer`,data)
}

// {
//     "queryType": "promotion",
//     "client": "987",
//     "entity": "678",
//     "branch": "1",
//     "department": "1234",
//     "studentList": [
//         {
//             "studentId": "stu@987",
//             "batch": "369"
//         }
//     ]
// }

// const leaveEnd = `${apiUrl}/leave`;  

// export function leaveInsert(params) {    
//     return http.post(`${leaveEnd}?${params}`);
// }

// export function staffLeaveInsert(params) {    
//     return http.post(`${apiUrl}/staff_leave?${params}`);
// }

// export function getAllLeaves(params) {
//     return http.get(`${leaveEnd}?${params}`)
// }
// export function getStaffAllLeaves(params) {
//     return http.get(`${apiUrl}/staff_leave?${params}`)
// }

// export function updateLeaves(params) {
//     return http.put(`${leaveEnd}?${params}`)
// }

// export function staffUpdateLeaves(params) {
//     return http.put(`${apiUrl}/staff_leave?${params}`)
// }
// export function staffListLeave(params) {
//     return http.get(`${apiUrl}/leave_list?${params}`)
// }