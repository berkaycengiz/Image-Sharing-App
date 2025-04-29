import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const updatePost = async (id: string, description: string) => {
  try {
    const response = await axios.patch(`${BASE_URL}/post/${id}`, {
      description
    }, 
    {
      withCredentials: true,
    })
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data?.message || "An unknown error occured!";
  }
};