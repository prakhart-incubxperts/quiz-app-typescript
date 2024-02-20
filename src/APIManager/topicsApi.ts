import axios from "axios";
import { url } from "../Utils/url";

export async function fetchData() {
    try {
      console.log("inside topic api");
      
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

  export async function isTopicNameExists(topic:string,id:any) {
    try {
      const response = await axios.get(`${url}/topics/getname`,{ params: { topic:topic,topicId: id } })
      return response.data;
    }
    catch (error) {
      console.log("error:", error);
    }
  }

  export async function editTopic(topic:string,id:any) {
    try {
      const response = await axios.put(`${url}/topics/edit`,{ params: { topic:topic,topicId: id } })
      return response.data;
    }
    catch (error) {
      console.log("error:", error);
    }
  }