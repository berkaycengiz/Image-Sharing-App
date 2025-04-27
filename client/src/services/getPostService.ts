import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const getPost = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/post/${id}`, {
        withCredentials: true,
      })
      return response.data;
    } 
    catch (error: any) {
      throw error.response?.data?.message || "An unknown error occured!";
    }
  };