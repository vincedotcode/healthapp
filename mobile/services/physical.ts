import axios, { AxiosError } from 'axios';

interface BloodPressure {
  systolic: number;
  diastolic: number;
}

export interface PhysicalRecord {
  _id: string;
  user_id: string;
  weight: number;
  height: number;
  bmi: number;
  body_fat_percentage: number;
  muscle_mass: number;
  water_percentage: number;
  waist_circumference: number;
  hip_circumference: number;
  blood_pressure: BloodPressure;
  heart_rate: number;
  notes: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface PhysicalRecordsResponse {
  success: boolean;
  data: PhysicalRecord[];
}

interface ApiResponse {
  message: string[];
  error: string;
}

export const getPhysicalRecords = async (userId: string): Promise<PhysicalRecordsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/physical-records/${userId}`;

  try {
    const response = await axios.get<PhysicalRecordsResponse>(url);
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
