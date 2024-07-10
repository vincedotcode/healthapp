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

export interface AppointmentDetailsProps {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
  };
  doctor_id: {
    _id: string;
    user_id: {
      _id: string;
      name: string;
    };
    specialty: string;
    availability: string;
  };
  appointment_date: string;
  appointment_time: string;
  status: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

interface AppointmentsResponse {
  success: boolean;
  data: Appointment[];
}

interface AppointmentByIdResponse {
  success: boolean;
  data: AppointmentDetailsProps;
}

interface ApiResponse {
  message: string[];
  error: string;
}

interface CreateAppointment {
  user_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
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

export const getAppointmentsById = async (id: string): Promise<AppointmentByIdResponse> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/appointments/${id}`;

  try {
    const response = await axios.get<AppointmentByIdResponse>(url);
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

export const createAppointment = async (appointment: CreateAppointment): Promise<AppointmentDetailsProps> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/appointments`;

  try {
    const response = await axios.post<AppointmentDetailsProps>(url, appointment);
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

export const updateAppointmentStatus = async (id: string, status: string): Promise<AppointmentDetailsProps> => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/appointments/${id}`;

  try {
    const response = await axios.put<AppointmentDetailsProps>(url, { status });
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
