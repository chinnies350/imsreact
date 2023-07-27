import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/alldata";

function clientUrl(type, id) {
  return `${apiEndpoint}/${id}`;
}

export function getClients(params){
  console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", params)
  return http.get(`${apiEndpoint}?${params}`);
}

export function getClientsById(type, id) {
  return http.get(`${clientUrl(type, id)}/list`);
}

export function deleteClient(url){
  return http.delete(`${apiUrl}${url}`);
} 

export function saveClient(data) {
  return http.post(`${apiUrl}/clients`, data);
}

export function updateClient(params, data) {
  return http.put(`${apiUrl}/clients?uid=${params}`, data);
}

export function clientData(uid) {
  return http.get(`${apiUrl}/clients?uid=${uid}`)
}

// new method created on 22-06-19
export function addInstituteEntity(data){
  return http.post(`${apiUrl}/instituteEntity`, data)
}

// new method created on 05-07-19
export function updateInstituteEntity(data){
  return http.put(`${apiUrl}/instituteEntity`, data)
}

