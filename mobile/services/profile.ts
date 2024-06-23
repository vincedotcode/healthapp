import axios, { AxiosError } from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  gender: string;
  role: string;
}

interface DoctorProfile {
  _id: string;
  user_id: string;
  specialty: string;
  availability: string;
  approval_status: string;
}

export interface UserProfile {
  user: User;
  doctorProfile?: DoctorProfile;
  applicationStatus?: string;
}

interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
}

interface ApiResponse {
  message: string[];
  error: string;
}

export const getUserProfile = async (userId: string): Promise<UserProfileResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/profile/${userId}`;

  try {
    const response = await axios.get<UserProfileResponse>(url);
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
