import axios from "axios";
import { url } from "../Utils/url";

export async function getTestAttempt(data: any) {
    try {
      return await axios.get(`${url}/test/attempt`, { params: { tid: data } })
    } catch (error) {
      console.log("error:", error);
    }
  }
  
  export async function getTestRank(data: any) {
    try {
      return await axios.get(`${url}/test/rank`, { params: { tid: data } })
    } catch (error) {
      console.log("error:", error);
    } 
  }
  
  export async function saveTest(data: any) {
    try {
      if(data.length>0){
        return await axios.post(`${url}/test/add`, { params: data })
      }
    } catch (error) {
      console.log("error:", error);
    } 
  }