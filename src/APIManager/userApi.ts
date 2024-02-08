import axios from "axios";
import { url } from "../Utils/url";


export async function fetchUsers() {
    try {
      const response = await axios.get(`${url}/users`)
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