import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const getPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      return response.data;
    } 
    catch (error: any) {
      throw error.response?.data?.message || "An unknown error occured!";
    }
  };