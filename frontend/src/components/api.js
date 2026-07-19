import axios from 'axios';
const api=axios.create({
   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});
export const googleAuth=(code)=>{
    return api.get(`/users/api/v1/google?code=${code}`, {
      withCredentials: true,
    });
}