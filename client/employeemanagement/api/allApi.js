import axios from "axios";
import './commonApi'



export const getform = async (tokendata) => {
    return axios.get("http://127.0.0.1:8000/forms/",{
      headers: {
      "Authorization": `Bearer ${tokendata}`,
    },})
}


  export const getSingleform = async (id) => {
const token=sessionStorage.getItem("access_token")

    return axios.get(`http://127.0.0.1:8000/forms/${id}/`,{
      headers: {
      "Authorization": `Bearer ${token}`,
    },})
}

  export const addform = async (data) => {
const token=sessionStorage.getItem("access_token")

    return axios.post("http://127.0.0.1:8000/forms/",data,{
      headers: {
      "Authorization": `Bearer ${token}`,
    },})
}

  export const formsubmit = async (data,id) => {
const token=sessionStorage.getItem("access_token")

    return axios.post(`http://127.0.0.1:8000/submit-form/${id}`,data,{
      headers: {
      "Authorization": `Bearer ${token}`,
    },})
}

  export const formdata = async (id) => {
const token=sessionStorage.getItem("access_token")

    return axios.get(`http://127.0.0.1:8000/submit-form/${id}`,{
      headers: {
      "Authorization": `Bearer ${token}`,
    },})
}
  export const deleteformdata = async (id) => {
const token=sessionStorage.getItem("access_token")

    return axios.delete(`http://127.0.0.1:8000/submit-form/${id}`,{
      headers: {
      "Authorization": `Bearer ${token}`,
    },})
}

  

  export const tokenget = async (username,password) => {
    
    return axios.post(`http://127.0.0.1:8000/token/`,username,password);
  };

  export const useradd = async (data) => {
    return axios.post(`http://127.0.0.1:8000/user/`,data);
  };

  export const userget = async (token) => {
    return axios.get(`http://127.0.0.1:8000/user/`,{
      headers: {
      "Authorization": `Bearer ${token}`,
    },})}



  export const passwordchange = async (token,data) => {
      return axios.post(`http://127.0.0.1:8000/user/change_password/`,data,{
        headers: {
        "Authorization": `Bearer ${token}`,
      },})}
