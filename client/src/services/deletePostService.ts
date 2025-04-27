import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const deletePost = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/post/${id}`, {
      withCredentials: true,
    })
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data?.message || "An unknown error occured!";
  }
};