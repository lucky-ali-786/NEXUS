const BASE_API = "/likes/api/v1"
import api from '../src/utils/api.js'
export const trendingposts = async () => {
    try {
        const res = await api.get(`${BASE_API}/like/trendingposts`)
        return {
            success: true,
            data: res.data
        }
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "failed due to some reason",
        }
                }
}
export const togglelike = async (payload) => {
    try {
        const res = await api.post(`${BASE_API}/like/toggle`, payload)
        return {
            success: true,
            data: res.data
        }
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "failed due to some reason",
        }
    }
}
export const getlikes = async (postId) => {
    try {
        const res = await api.get(`${BASE_API}/likeofapost/${postId}`)
        return {
            success: true,
            data: res.data,

        }
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "failed due to some reason",
        }
    }
}
export const mylikes = async () => {
    try {
        const res = await api.get(`${BASE_API}/mylikes`)
        return {    
            success: true,
            data: res.data,
        }
    }

    catch (err) {   
        return {
            success: false,
            message: err.response?.data?.message || "failed due to some reason",
        }
    }
}