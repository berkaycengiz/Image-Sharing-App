import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      username,
      email,
      password
    },
    {withCredentials: true}
  );
    console.log('Response:', response.data);
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data?.message || "Registration failed!";
  }
};