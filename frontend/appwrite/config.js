import api from "../src/utils/api.js";

const API_BASE = "/posts/api/v1";

export const createPost = async (payload) => {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    const res = await api.post(`${API_BASE}/createpost`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      success: true,
      data: res.data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Create post failed",
    };
  }
};

export const updatePost = async (postId, payload) => {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const res = await api.patch(`${API_BASE}/${postId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      success: true,
      data: res.data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Update post failed",
    };
  }
};

export const deletePost = async (postId) => {
  try {
    await api.delete(`${API_BASE}/${postId}`);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Delete post failed",
    };
  }
};

export const getPost = async (postId) => {
  try {
    const res = await api.get(`${API_BASE}/getpost/${postId}`);

    return {
      success: true,
      data: res.data.data,
    };
  } catch {
    return {
      success: false,
      message: "Post not found",
    };
  }
};

export const getAllPosts = async () => {
  try {
    const res = await api.get(`${API_BASE}/getallposts`);

    return {
      success: true,
      data: res.data.data,
    };
  } catch {
    return {
      success: false,
      message: "Could not fetch posts",
    };
  }
};

export const myposts = async () => {
    try {
        const res = await api.get(`${API_BASE}/myposts`);
        return {
            success: true,
            data: res.data.data
        }
    }
    catch{
        return {
            success: false,
            message: "Could not fetch posts",
        }
    }
}

export const scheduledpost = async (payload) => {
  try {
    const formdata = new FormData();
    Object.keys(payload).forEach((key) => {
      formdata.append(key, payload[key]);
    })
    const response = await api.post(`${API_BASE}/scheduledpost`, formdata, {
      headers: { "Content-Type": 'multipart/form-data' }
    })
    return {
      success: true,
      data: response.data.data
    }
  } catch (error) {
    return {
      success: false,
      message: "Could not schedule post",
    }
  }
}

// Added the generateBlog API call for the frontend
export const generateBlog = async (topic) => {
  try {
    const res = await api.post(`${API_BASE}/generate-blog`, { topic });
    return {
      success: true,
      data: res.data.data.content, // Extracts the actual markdown text returned from the backend
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to generate blog",
    };
  }
};