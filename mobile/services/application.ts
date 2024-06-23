import axios, { AxiosError } from 'axios';

interface Document {
  document_type: 'National ID' | 'Medical License' | 'Proof of Address' | 'CV' | 'Passport' | 'Proof of Qualifications';
  document_path: string;
}

export interface CreateApplication {
  user_id: string;
  specialty: string;
  availability: string;
  documents: Document[];
}

export interface Application {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
  };
  specialty?: string;
  availability?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  documents: Document[];
}

interface ApiResponse {
  message: string[];
  error: string;
}

interface ApplicationResponse {
  success: boolean;
  data: Application;
}

interface ApplicationsByUserIdResponse {
  success: boolean;
  data: Application[];
}

export const createApplication = async (applicationData: CreateApplication): Promise<ApplicationResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/applications`;

  try {
    const response = await axios.post<ApplicationResponse>(url, applicationData);
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

export const getApplicationsByUserId = async (userId: string): Promise<ApplicationsByUserIdResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/applications/user/${userId}`;

  try {
    const response = await axios.get<ApplicationsByUserIdResponse>(url);
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
