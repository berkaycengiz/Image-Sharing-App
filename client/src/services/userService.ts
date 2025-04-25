import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const getUser = async (username: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/${username}`, {
        withCredentials: true
    });
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data?.message;
  }
};