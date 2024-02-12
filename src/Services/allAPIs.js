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
export const getAllProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,"",reqHeader) //since,search key is not a number we can pass it through url as query
}

//getuserProject API
export const getUserProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)
}

//edit project
export const editProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/project/edit/${id}`,reqBody,reqHeader)
}

//deleteproject
export const deleteProjectAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/project/delete/${id}`,{},reqHeader)
}

//update profile
export const updateUserProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}