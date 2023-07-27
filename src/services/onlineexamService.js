import http from "./httpService";
import { apiUrl } from "../config.json";

let result = `${ apiUrl }/onlineResult`

export function onlineResult(data) {
    return http.post(`${result}`,data);
}

export function getresultData(params) {
    console.log(result,params)
    return http.get(`${result}?${params}`);
}



