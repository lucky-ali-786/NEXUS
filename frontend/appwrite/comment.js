
import api from '../src/utils/api.js'
const BASE_URL="/comments/api/v1"
export const createcomment =async(payload)=>{
    try {  
        const res=await api.post(`${BASE_URL}/createcomment`,payload);
        return {
            success:true,
            data:res.data
        }}
        catch(err){
             return {
            success:false,
             message: err.response?.data?.message || "failed",
        }
        }
}
export const updatecomment=async(payload)=>{
     try {  
        const res=await api.patch(`${BASE_URL}/editcomment`,payload);
        return {
            success:true,
            data:res.data
        }}
        catch(err){
             return {
            success:false,
             message: err.response?.data?.message || "Update failed",
        }
        }
}
export const deletecomment=async(commentId)=>{
    try {
        const res=await api.delete(`${BASE_URL}/deletecomment/${commentId}`);
        return {    
            success:true,
            data:res.data
        }
    }   
    catch(err){
         return {
        success:false,
            message: err.response?.data?.message || "Delete failed",
    }
    }
}

export const getcommentsbypostid=async(postId)=>{
    try {
        const res=await api.get(`${BASE_URL}/getcommentsbypostid/${postId}`);
        return {
            success:true,
            data:res.data
        }
    }
    catch(err){
         return {
        success:false,
            message: err.response?.data?.message || "Fetch failed",
    }
    }
}
export const getmycomments=async()=>{
    try {
        const res=await api.get(`${BASE_URL}/mycomments`);
        return {
            success:true,
            data:res.data
        }
    }
    catch(err){
         return {
        success:false,
            
            message: err.response?.data?.message || "Fetch failed",
    }
    }
}

