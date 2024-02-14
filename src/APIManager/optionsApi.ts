import axios from "axios";
import { url } from "../Utils/url";

export async function saveOptions(data: any) {
    try {
      return await axios.post(`${url}/options/add`, data);
    } catch (error) {
      console.log("error:", error);
    } 
  }
  
  export async function getOptionsByQuestionId(data: any) {
    try {
      return await axios.get(`${url}/options/qid`, { params: { tid: data } })
    } catch (error) {
      console.log("error:", error);
    } 
  }

  export async function getCorrectOption(id: number,value:number) {
    try {
      return await axios.get(`${url}/option/correct`, { params: { id: id,value:value } })
    } catch (error) {
      console.log("error:", error);
    } 
  }
  
  export async function getOptionByQuestionId(data: any) {
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