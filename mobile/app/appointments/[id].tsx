// app/appointments/[id].tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter, Stack, Link } from 'expo-router';
import { getAppointmentsByDoctorId, Appointment } from '@/services/appointment';
import Colors from '@/constants/Colors';
import AppointmentCardDoctor from '@/components/AppointmentCardDoctor';
import EmptyCard from '@/components/EmptyCard';
import { Ionicons } from "@expo/vector-icons";


const AppointmentsPage: React.FC = () => {
  const { id: doctorId } = useLocalSearchParams<{ id: string }>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdateStatus = async (appointmentId: string, status: string) => {
    try {
      // Implement the logic to update the appointment status here
      console.log(`Updating appointment ${appointmentId} to ${status}`);
      // After successful update, refetch the appointments
      await fetchAppointments();
    } catch (err) {
      console.error('Error updating appointment status:', err);
    }
  };

  const handleViewDetails = (appointmentId: string) => {
    // Implement the logic to view appointment details here
    console.log(`Viewing details for appointment ${appointmentId}`);
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAppointmentsByDoctorId(doctorId as string);
      setAppointments(response.data);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      console.error('Error fetching appointments:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color={Colors.light.primary} /></View>;
  }

  if (error) {
    return <View style={styles.loading}><Text>Error: {error}</Text></View>;
  }

  return (
 
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Doctor\'s Appointments',
          headerLeft: () => (
            <Link href={{ pathname: '(auth)/profile' }}>
              <Ionicons name="chevron-back-outline" size={30} />
            </Link>
          ),
        }}
      />
      <Text style={styles.title}>Doctor's Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <AppointmentCardDoctor
            appointment={item}
            onUpdateStatus={handleUpdateStatus}
            onViewDetails={handleViewDetails}
          />
        )}
        ListEmptyComponent={<EmptyCard title="No appointments found" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.light.primary,
  },
  backButton: {
    fontSize: 18,
    color: Colors.light.primary,
    paddingLeft: 10,
  },
});

export default AppointmentsPage;
