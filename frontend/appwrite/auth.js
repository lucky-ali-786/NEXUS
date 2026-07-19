
import api from "../src/utils/api.js";
const API_BASE = "/users/api/v1";

export const registerUser = async (payload) => {
  try {
    const res = await api.post(`${API_BASE}/register`, payload);
    return {
      success: true,
      data: res.data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Registration failed",
    };
  }
};
export const sendotp = async (payload) => {
  try {
    const res = await api.post(`${API_BASE}/sendotp`, payload);
    return {
      success: true,
      verificationToken: res.data,
    };
    
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send OTP",
    };
  }
}
export const loginUser = async (payload) => {
  try {
    const res = await api.post(`${API_BASE}/login`, payload);

    return {
      success: true,
      data: res.data.data.user,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await api.get(`${API_BASE}/getcurrentuser`, );
    return {
      success: true,
      data: res.data.data,
    };
  } catch {
    return {
      success: false,
      message: "User not logged in",
    };
  }
};
export const getUser = async (userId) => {
  try {
    const res = await api.get(`${API_BASE}/user/${userId}`);
    return {
      success: true,
      data: res.data.data,
    };
  } catch {
    return {
      success: false,
      message: "User not found",
    };
  }
};
export const logoutUser = async () => {
  try {
    await api.post(
      `${API_BASE}/logout`,
      {},
    );

    return { success: true };
  } catch {
    return { success: false, message: "Logout failed" };
  }
};
