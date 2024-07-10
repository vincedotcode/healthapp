import axios, { AxiosError } from 'axios';

interface CreateMedication {
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

interface CreateMedicationResponse {
  success: boolean;
  data: CreateMedication;
}

interface ApiResponse {
  message: string[];
  error: string;
}
export interface Medication {
  _id: string;
  user_id: string;
  appointment_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  reminders: boolean;
  prescribed_by: {
    _id: string;
    user_id: string;
    specialty: string;
    availability: string;
    approval_status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  side_effects: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MedicationsResponse {
  success: boolean;
  data: Medication[];
}

export const createMedication = async (medication: CreateMedication): Promise<CreateMedicationResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/medications`;

  try {
    const response = await axios.post<CreateMedicationResponse>(url, medication);
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


export const getMedicationsByAppointmentId = async (appointmentId: string): Promise<MedicationsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/medications/appointment/${appointmentId}`;

  try {
    const response = await axios.get<MedicationsResponse>(url);
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

export const getMedicationsByUserId = async (userId: string): Promise<MedicationsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/medications/user/${userId}`;

  try {
    const response = await axios.get<MedicationsResponse>(url);
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

export const deleteMedicationById = async (id: string): Promise<ApiResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/medications/${id}`;

  try {
    const response = await axios.delete<ApiResponse>(url);
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