import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const createPost = async (file: File | null, description: string) => {
  const formData = new FormData();

  if(file){
    formData.append('photo', file);
  }

  formData.append('description', description);

  try {
    const response = await axios.post(`${BASE_URL}/post`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
    console.log('Post uploaded:', response.data);
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data?.message
  }
};