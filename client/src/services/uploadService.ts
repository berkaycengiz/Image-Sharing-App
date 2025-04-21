import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const uploadProfilePic = async (file: File | null, username: string) => {
  const formData = new FormData();
  if(file){
    formData.append('profilePic', file);
  }
  try {
    const response = await axios.post(`${BASE_URL}/auth/upload/${username}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
  });
    console.log('Profile picture uploaded:', response.data);
    return response.data;
  } 
  catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};