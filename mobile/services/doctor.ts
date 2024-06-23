import axios, { AxiosError } from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  gender: string;
}

export interface Doctor {
  _id: string;
  user_id: User;
  specialty: string;
  availability: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface DoctorsResponse {
  success: boolean;
  data: Doctor[];
}

interface ApiResponse {
  message: string[];
  error: string;
}

export const getAllDoctors = async (): Promise<DoctorsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/doctors`;

  try {
    const response = await axios.get<DoctorsResponse>(url);
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
