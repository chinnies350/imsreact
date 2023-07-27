import jwtDecode from "jwt-decode";
import http from "./httpService";

import { apiUrl } from "config.json";

const apiEndpoint = apiUrl + "/login";
const forgotPsw = apiUrl + "/forgotPassword";
const otpValidateEnd = apiUrl + '/otpValidate'
const passwordUpdateEnd = apiUrl + '/passwordUpdate';
const changePswEnd = apiUrl + '/validatepassword';
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password, ref = "", next = "") {
  const result = await http.post(apiEndpoint, { username, password, ref, next });
  // console.log("loging results===>",result)
  localStorage.setItem(tokenKey, result.data.access_token);
  localStorage.setItem("loginInfo", JSON.stringify(result));
  localStorage.setItem("access", JSON.stringify(result.data.roles));

  return result;
}

export function loginWithJwt(jwt) {
  console.log(jwt)
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const roles1 = JSON.parse(localStorage.getItem("access") || "[]")
    

   

//* const { identity, user_claims: { data,clientLogo,entity_logo,pictureUrl,roles },user_claims } = jwtDecode(jwt);  
 
//! before changes data get from token 
 //! after changes data will get from loginInfo.data.access_data
    const loginInfo= JSON.parse(localStorage.getItem("loginInfo"))
    console.log("loginData==>",loginInfo.data.access_data)
console.log("tokenData==>",jwtDecode(jwt))
  const { data,clientLogo,entity_logo,pictureUrl,roles ,uid} =   loginInfo.data.access_data;
   
   
    data.pictureUrl=pictureUrl;
    data.clientLogo=clientLogo;
    data.entityLogo=entity_logo;
    data.rightsData=roles1

    console.log(data,'mmmmmmmmmmmmm')
    //* return { uid: identity,  data};
     return { uid: uid,  data};
    
  } catch (ex) {
    return null;
  }
}

export function getJwt() {  
  return localStorage.getItem(tokenKey);   
}

// Forgot Password
export const forgotPassword = (params) => {
  return http.get(`${forgotPsw}?${params}`)
}

export const otpValidate = (params) => {
  return http.get(`${otpValidateEnd}?${params}`)
}

export const passwordUpdate = (params) => {
  return http.get(`${passwordUpdateEnd}?${params}`)
}

// Change Password
export const passwordValidate = (params) => {
  return http.get(`${changePswEnd}?${params}`)
}
 
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
