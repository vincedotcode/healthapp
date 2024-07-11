import axios, { AxiosError } from 'axios';

interface CreateHealthRecord {
  user_id: string;
  doctor_id: string;
  appointment_id: string;
  record_type: 'Diagnosis' | 'Treatment' | 'Prescription' | 'Lab Result' | 'Follow-up';
  description: string;
  record_data: string;
  attachment_path: string;
  follow_up_date: string;
  symptoms: string;
  treatment: string;
  medication_prescribed: string;
  lab_results: string;
  notes: string;
  status: 'Pending' | 'Reviewed';
  reviewed_by: string;
}

interface CreateHealthRecordResponse {
  success: boolean;
  data: HealthRecord;
}

interface ApiResponse {
  message: string[];
  error: string;
}

export interface HealthRecord {
  _id: string;
  user_id: string;
  doctor_id: string;
  appointment_id: string;
  record_type: string;
  description: string;
  record_data: string;
  attachment_path: string;
  follow_up_date: string;
  symptoms: string;
  treatment: string;
  medication_prescribed: string;
  lab_results: string;
  notes: string;
  status: string;
  reviewed_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface HealthRecordsResponse {
  success: boolean;
  data: HealthRecord[];
}

export const createHealthRecord = async (record: CreateHealthRecord): Promise<CreateHealthRecordResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/healthrecords`;

  try {
    const response = await axios.post<CreateHealthRecordResponse>(url, record);
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

export const getHealthRecordsByAppointmentId = async (appointmentId: string): Promise<HealthRecordsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/healthrecords/appointment/${appointmentId}`;

  try {
    const response = await axios.get<HealthRecordsResponse>(url);
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

export const getHealthRecordsByUserId = async (userId: string): Promise<HealthRecordsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/healthrecords/user/${userId}`;

  try {
    const response = await axios.get<HealthRecordsResponse>(url);
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

export const deleteHealthRecordById = async (id: string): Promise<ApiResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/healthrecords/${id}`;

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
