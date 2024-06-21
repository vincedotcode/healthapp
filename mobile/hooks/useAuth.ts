import { useState, useEffect } from 'react';
import { getToken, getUser, removeToken, removeUser } from '@/hooks/useStorage';


interface UserData {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone_number: string;
    address: string;
    date_of_birth: string;
    gender: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }

  
export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedToken = await getToken();
      const storedUser = await getUser();
      setToken(storedToken);
      setUser(storedUser);
      setLoading(false);
    };
    loadStoredData();
  }, []);

  const logout = async () => {
    await removeToken();
    await removeUser();
    setToken(null);
    setUser(null);
  };

  return { token, user, loading, logout };
};
