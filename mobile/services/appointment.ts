import axios, { AxiosError } from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface DoctorUser {
  _id: string;
  name: string;
}

interface Doctor {
  _id: string;
  user_id: DoctorUser;
  specialty: string;
  availability: string;
}

export interface Appointment {
  _id: string;
  user_id: User;
  doctor_id: Doctor;
  appointment_date: string;
  appointment_time: string;
  status: 'Sent' | 'Scheduled' | 'Completed' | 'Cancelled';
  reason: string;
  createdAt: string;
  updatedAt: string;
}

interface AppointmentsResponse {
  success: boolean;
  data: Appointment[];
}

interface ApiResponse {
  message: string[];
  error: string;
}

export const getAppointmentsByUserId = async (userId: string): Promise<AppointmentsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/appointments/user/${userId}`;

  try {
    const response = await axios.get<AppointmentsResponse>(url);
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

export const getAppointmentsByDoctorId = async (doctorId: string): Promise<AppointmentsResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/appointments/doctor/${doctorId}`;

  try {
    const response = await axios.get<AppointmentsResponse>(url);
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
