import axios from "axios";
import { url } from "../Utils/url";


export async function saveQuestion(data: any) {
  try {
    const result = await axios.post(`${url}/questions/add`, data);
  return result;
  } catch (error) {
    console.log("error in save:", error);
  } 
}

export async function getQuestionByDescription(data: any) {
  try {
    const result = await axios.get(`${url}/question`, { params: { tid: data.tid, question: data.question } });
    return result;
  } catch (error) {
    console.log("error in get:", error);
  }
}

export async function getQuestion(data: any) {
  try {
    return await axios.get(`${url}/questions`, { params: { tid: data } })
  } catch (error) {
    console.log("error in get:", error);
  }
}

export async function getQuestionByTopicId(data: any) {
  try {
    const res = await axios.get(`${url}/questions/tid`, { params: { tid: data } });
  return res;
  } catch (error) {
    console.log("error:",error); 
  } 
}

export async function deleteQuestion(data: any) {
  try {
  return await axios.put(`${url}/question/delete`, { qid: data })
  } catch (error) {
    console.log("error in delete:", error);
  }
}

export async function getQuestionByQuesionId(data: any) {
  try {
    return await axios.get(`${url}/question/qid`, { params: { qid: data } })
  } catch (error) {
    console.log("error:", error);
  }
}

export async function EditQuestion(data: any) {
  try {
    return await axios.put(`${url}/question/edit`, data)
  } catch (error) {
    console.log("error:", error);
  } 
}





