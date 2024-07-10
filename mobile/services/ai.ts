import axios, { AxiosError } from 'axios';
import { useAuth } from '@/hooks/useAuth';

interface HealthChatResponse {
  response: string;
}

interface ApiResponse {
  message: string[];
  error: string;
}

const useHealthChatService = () => {
  const { user } = useAuth();

  const sendMessageToHealthChat = async (message: string): Promise<HealthChatResponse> => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/health-chat`;

    if (!user || !user._id) {
      throw new Error('User is not authenticated.');
    }

    // Construct the message to include the user ID
    const messageWithUserId = `User ID: ${user._id}, Message: ${message}`;

    const requestBody = {
      user_id: user._id,
      message: messageWithUserId
    };

    try {
      const response = await axios.post<HealthChatResponse>(url, requestBody);
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

  return { sendMessageToHealthChat };
};

export default useHealthChatService;
