import axios, { AxiosError } from 'axios';
import { saveToken, saveUser } from '@/hooks/useStorage';

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  role: 'patient' | 'doctor' | 'admin';
}

interface LoginCredentials {
  email: string;
  password: string;
}



interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  gender: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterResponse {
  user: UserData;
  success: boolean;
}

interface ApiResponse {
  message: string[];
  error: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: UserData;
}

export const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/register`;

  try {
    const response = await axios.post<RegisterResponse>(url, credentials);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      throw new Error(JSON.stringify({
        statusCode: axiosError.response.status,
        message: axiosError.response.data.message || ['An unexpected error occurred'],
        error: axiosError.response.data.error || 'Bad Request'
      }));
    } else {
      throw new Error(JSON.stringify({
        statusCode: 500,
        message: ['Network Error or Internal Server Error'],
        error: 'Server Error'
      }));
    }
  }
};


export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/login`;

  try {
    const response = await axios.post<LoginResponse>(url, credentials);
    console.log(response.data)
    const { token, user } = response.data;
    await saveToken(token);
    await saveUser(user);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      throw new Error(JSON.stringify({
        statusCode: axiosError.response.status,
        message: axiosError.response.data.message || ['An unexpected error occurred'],
        error: axiosError.response.data.error || 'Bad Request'
      }));
    } else {
      throw new Error(JSON.stringify({
        statusCode: 500,
        message: ['Network Error or Internal Server Error'],
        error: 'Server Error'
      }));
    }
  }
};