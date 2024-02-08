import axios from "axios";
import { url } from "../Utils/url";

export async function fetchData() {
    try {
      const response = await axios.get(`${url}/topics`)
      return response.data;
    }
    catch (error) {
      console.log("error:", error);
    }
  }

  export async function isTopicExists(data:any) {
    try {
      const response = await axios.get(`${url}/topics/get`,{ params: { topic: data } })
      return response.data;
    }
    catch (error) {
      console.log("error:", error);
    }
  }
  
  export async function saveTopic(data: any) {
    try {
    return await axios.post(`${url}/topics/add`, data);
    } catch (error) {
      console.log("error:", error);
    }
  }