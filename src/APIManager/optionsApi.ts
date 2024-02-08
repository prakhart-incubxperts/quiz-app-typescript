import axios from "axios";
import { url } from "../Utils/url";

export async function saveOptions(data: any) {
    try {
      return await axios.post(`${url}/options/add`, data);
    } catch (error) {
      console.log("error:", error);
    } 
  }
  
  export async function getOptionsByQuesionId(data: any) {
    try {
      return await axios.get(`${url}/options/qid`, { params: { tid: data } })
    } catch (error) {
      console.log("error:", error);
    } 
  }
  
  export async function getOptionByQuesionId(data: any) {
    try {
      return await axios.get(`${url}/option/qid`, { params: { tid: data } })
    } catch (error) {
      console.log("error:", error);
    } 
  }
  
  export async function editOption(data: any) {
    try {
      return await axios.put(`${url}/option/edit`, data)
    } catch (error) {
      console.log("error:", error);
    } 
  }