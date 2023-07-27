import http from "./httpService";
import { apiUrl } from "../config.json";



// export function getAssignments() {
//     return http.get(`${apiUrl}/${url}`);
// }

export function addVisitor() {
    return http.post(`${apiUrl}/dashCount`);
}
export function getNumberOfVisitor(){
        return http.get(`${apiUrl}/dashCount`);
}

export function addReachUs(data){
    return http.post(`${apiUrl}/reachUs`,data);
}
export function addRequestDemo(data){
    return http.post(`${apiUrl}/requestDemo`,data);
}
