import axios, { AxiosError } from 'axios';

interface CreateSymptom {
  user_id: string;
  appointment_id: string;
  symptoms: string;
  analysis_date: string;
  result: string;
  severity: string;
  recommendations: string;
  follow_up_date: string;
}

interface CreateSymptomResponse {
  success: boolean;
  data: CreateSymptom;
}

interface ApiResponse {
  message: string[];
  error: string;
}

export interface Symptom {
  _id: string;
  user_id: string;
  appointment_id: {
    _id: string;
    user_id: string;
    doctor_id: string;
    appointment_date: string;
    appointment_time: string;
    status: string;
    reason: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  symptoms: string;
  analysis_date: string;
  result: string;
  severity: string;
  recommendations: string;
  follow_up_date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SymptomsResponse {
  success: boolean;
  data: Symptom[];
}

export const createSymptom = async (symptom: CreateSymptom): Promise<CreateSymptomResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/symptoms`;

  try {
    const response = await axios.post<CreateSymptomResponse>(url, symptom);
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

export const getSymptomsByUserId = async (userId: string): Promise<SymptomsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/symptoms/user/${userId}`;

  try {
    const response = await axios.get<SymptomsResponse>(url);
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

export const getSymptomsByAppointmentId = async (appointmentId: string): Promise<SymptomsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/symptoms/appointment/${appointmentId}`;

  try {
    const response = await axios.get<SymptomsResponse>(url);
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
