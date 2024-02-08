import {commonAPI} from './commonAPI'
import {SERVER_URL} from './serverURL'

//register api
export const registerAPI=async(user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

//login API
export const loginAPI=async(user)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

//addproject API
export const addProjectAPI= async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/addproject`,reqBody,reqHeader) // it has header section since we have uploading file
}

//getHomeProject API
export const getHomeProjectAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-projects`,"","")
}

//getallProject API
export const getAllProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects`,"",reqHeader)
}

//getuserProject API
export const getUserProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)
}