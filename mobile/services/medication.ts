import axios, { AxiosError } from 'axios';

interface Medication {
  user_id: string;
  appointment_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  reminders: boolean;
  prescribed_by: string;
  side_effects: string;
}

interface MedicationResponse {
  success: boolean;
  data: Medication;
}

interface ApiResponse {
  message: string[];
  error: string;
}

export const createMedication = async (medication: Medication): Promise<MedicationResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/medications`;

  try {
    const response = await axios.post<MedicationResponse>(url, medication);
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
