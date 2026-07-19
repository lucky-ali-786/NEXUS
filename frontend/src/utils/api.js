import axios from 'axios';
import { logout } from '../store/authSlice.js';
import store  from '../store/store.js'; // Ensure correct import

const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true,
});



export default api;


