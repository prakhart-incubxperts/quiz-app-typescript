import axios from "axios";
import { url } from "../Utils/url";


// export async function fetchUsers() {
//     try {
//       const response = await axios.get(`${url}/users`)
//       return response.data;
//     }
//     catch (error) {
//       console.log("error:", error);
//     }
//   }

  export async function findorCreateUser(data:any) {
    try {
      const response = await axios.get(`${url}/users`,{params:data})
      return response.data;
    }
    catch (error) {
      console.log("error:", error);
    }
  }

  export async function getUserByEmail(data:any) {
    try {
      const response = await axios.get(`${url}/users/get`,{ params: { email: data } })
      return response.data;
    }
    catch (error) {
      console.log("error in get:", error);
    }
  }
  
  export async function saveUser(data: any) {
    try {
      return await axios.post(`${url}/users/add`, data);
    } catch (error) {
      console.log("error:", error);
    } 
  }

  export async function loginUser(data: any) {
    try {
      console.log("data inside loginuser:",data);
      const res= await axios.post(`${url}/users/login`, {data});
      console.log("res user login:",res);
      return res;
    } catch (error) {
      console.log("error:", error);
    } 
  }

  export async function checkUser(data: any) {
    try {
      return await axios.post(`${url}/users/account`, {data});
    } catch (error) {
      console.log("error:", error);
    } 
  }

  